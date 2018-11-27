import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withHandlers, withStateHandlers, pure } from 'recompose'
import { withNotifications } from 'modules/notification'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
import { DateFormat } from 'formaters'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  spinnerWhileLoading(['uid']),
  firestoreConnect(() => [
    {
      collection: 'cuenta'
    }
  ]),
  connect(({ firestore: { ordered } }) => ({
    cuentas: ordered.cuenta
  })),
  firestoreConnect(({ params, uid, idBarra }) => [
    {
      collection: 'comanda',
      where: [['idBartender', '==', uid], ['idBarra', '==', idBarra]]
    }
  ]),
  connect(({ firestore: { ordered } }) => ({
    orders: ordered.comanda
  })),
  withRouter,
  withNotifications,
  withStateHandlers(
    // Setup initial state
    ({ initialDialogOpen = false }) => ({
      newDialogOpen: initialDialogOpen
    }),
    // Add state handlers as props
    {
      toggleDialog: ({ newDialogOpen }) => () => ({
        newDialogOpen: !newDialogOpen
      })
    }
  ),
  withHandlers({
    registerMovement: props => (idBarra, newInventory) => {
      const { firestore, uid, showError, showSuccess } = props
      if (!uid) {
        return showError('Error cambiando el estado')
      }
      return firestore
        .add(
          { collection: 'movimientoInventario' },
          {
            idOrigen: idBarra,
            origen: 'Barra',
            tipo: 'Salida',
            productos: newInventory
          }
        )
        .then(() => {
          showSuccess('Comanda actualizada correctamente')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'No se acctualizo el estado')
          return Promise.reject(err)
        })
    }
  }),
  withHandlers({
    actualizarOCrearCuenta: props => order => {
      const { firestore, showError, cuentas } = props
      const cuentaAbierta = cuentas.filter(
        cuenta => cuenta.idMesa === order.idMesa && cuenta.estado === 'abierta'
      )
      if (!cuentaAbierta.length) {
        let subTotal = 0
        order.productos.map(prod => {
          subTotal =
            parseFloat(subTotal) +
            parseFloat(parseFloat(prod.valorUnitario) * parseInt(prod.cantidad))
        })
        const impuesto = parseFloat(subTotal) * parseFloat(0.08)
        const valorServicio = parseFloat(subTotal) * parseFloat(0.1)
        const total = parseFloat(subTotal) + parseFloat(valorServicio)

        const today = DateFormat(new Date())
        return firestore
          .add(
            { collection: 'cuenta' },
            {
              estado: 'abierta',
              fecha: today,
              idMesa: order.idMesa,
              idMesero: order.idMesero,
              mesero: order.mesero,
              productos: order.productos,
              impuesto,
              subTotal,
              total: total,
              valorServicio
            }
          )
          .catch(err => {
            showError(
              err.message || 'la cuenta no se ha registrado exitosamente'
            )
            return Promise.reject(err)
          })
      } else {
        const cuentaActualizar = cuentaAbierta[0]
        const productsIds = cuentaAbierta[0].productos.map(prod => prod.idProducto)
        const productsToAdd = cuentaAbierta[0].productos
        order.productos.map((producto, index) => {
          if (
            !productsIds.length ||
            !productsIds.filter(id => id === producto.idProducto).length
          ) {
            productsIds.push(producto.idProducto)
            productsToAdd.push({
              nombreProducto: producto.nombreProducto,
              idProducto: producto.idProducto,
              cantidad: producto.cantidad,
              valorUnitario: producto.cantidad
            })
          } else {
            const index = productsToAdd
              .map(product => product.idProducto)
              .indexOf(producto.idProducto)
            const savedProduct = productsToAdd[index]
            productsToAdd[index] = {
              productoNombre: producto.nombreProducto,
              idProducto: producto.idProducto,
              valorUnitario: producto.valorUnitario,
              cantidad:
                parseFloat(savedProduct.cantidad) + parseFloat(producto.cantidad)
            }
          }
        })
        let subTotal = 0
        productsToAdd.map(prod => {
          subTotal =
            parseFloat(subTotal) +
            parseFloat(parseFloat(prod.valorUnitario) * parseInt(prod.cantidad))
        })
        const impuesto = parseFloat(subTotal) * parseFloat(0.08)
        const valorServicio = parseFloat(subTotal) * parseFloat(0.1)
        const total = parseFloat(subTotal) + parseFloat(valorServicio)
        return firestore
          .update(
            { collection: 'cuenta', doc: cuentaActualizar.id },
            {
              impuesto,
              subTotal,
              total,
              valorServicio,
              productos: productsToAdd
            }
          )
          .catch(err => {
            showError(err.message || 'No se acctualizo la cuenta')
            return Promise.reject(err)
          })
      }
    },
    crearMovimiento: props => (listaProductos, idBarra, inventoryProduct) => {
      const newInventory = inventoryProduct
        .map(inventory =>
          inventory.productos.map(product => {
            const orderProduct = listaProductos
              .filter(producto => producto.idProducto === product.idProducto)
              .shift()
            const productQuantity = orderProduct ? orderProduct.cantidad : 0
            const newQuantity =
              parseInt(product.cantidadProducto) - parseInt(productQuantity)
            return {
              ...product,
              cantidadProducto: newQuantity
            }
          })
        )
        .shift()

      const {
        firestore,
        showError,
        showSuccess,
        toggleDialog,
        registerMovement
      } = props
      return firestore
        .update(
          { collection: 'inventarioBarra', doc: inventoryProduct[0].id },
          {
            ...inventoryProduct[0],
            productos: newInventory
          }
        )
        .then(() => {
          toggleDialog()
          showSuccess('Comanda actualizada correctamente')
          registerMovement(idBarra, listaProductos)
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Error actualizando')
          return Promise.reject(err)
        })
    }
  }),
  withHandlers({
    putComanda: props => (
      order,
      estado,
      listaProductos,
      idBarra,
      inventoryProduct
    ) => {
      const {
        firestore,
        uid,
        showError,
        showSuccess,
        crearMovimiento,
        actualizarOCrearCuenta
      } = props
      if (!uid) {
        return showError('Error cambiando el estado')
      }
      return firestore
        .update(
          { collection: 'comanda', doc: order.id },
          {
            estado: estado
          }
        )
        .then(() => {
          showSuccess('Comanda actualizada correctamente')
          crearMovimiento(listaProductos, idBarra, inventoryProduct)
          actualizarOCrearCuenta(order)
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'No se acctualizo el estado')
          return Promise.reject(err)
        })
    }
  }),
  pure
)
