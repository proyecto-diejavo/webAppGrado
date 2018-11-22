import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withHandlers, withStateHandlers, pure } from 'recompose'
import { withNotifications } from 'modules/notification'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  spinnerWhileLoading(['uid']),

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
    registerMovement: props => (idBarra, newInventory ) => {
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
    postMovimiento: props => (listaProductos, idBarra, inventoryProduct) => {
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
      id,
      estado,
      listaProductos,
      idBarra,
      inventoryProduct
    ) => {
      const { firestore, uid, showError, showSuccess, postMovimiento } = props
      if (!uid) {
        return showError('Error cambiando el estado')
      }
      return firestore
        .update(
          { collection: 'comanda', doc: id },
          {
            estado: estado
          }
        )
        .then(() => {
          showSuccess('Comanda actualizada correctamente')
          postMovimiento(listaProductos, idBarra, inventoryProduct)
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
