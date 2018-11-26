import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import { spinnerWhileLoading } from 'utils/components'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  spinnerWhileLoading(['uid']),

  firestoreConnect(({ fecha }) => [
    {
      collection: 'cuenta',
      where: [['estado', '==', 'cerrada'], ['fecha', '==', fecha]],
      orderBy: ['fecha', 'desc']
    }
  ]),
  connect(({ firestore: { ordered } }) => {
    if (!ordered.cuenta) return null
    const datesAndProducts = []
    const billsByProduct = []
    ordered.cuenta.map(cuenta =>
      cuenta.productos.map((pr, ind) => {
        if (
          !datesAndProducts.length ||
          !datesAndProducts.filter(
            obj =>
              obj.fecha === cuenta.fecha && obj.idProducto === pr.idProducto
          ).length
        ) {
          datesAndProducts.push({
            fecha: cuenta.fecha,
            idProducto: pr.idProducto
          })
          billsByProduct.push({
            productoNombre: pr.nombreProducto,
            idProducto: pr.idProducto,
            fecha: cuenta.fecha,
            totalVendido: pr.valorTotal,
            cantidadTotal: pr.cantidad
          })
        } else {
          const index = billsByProduct
            .map(bill => bill.fecha)
            .indexOf(cuenta.fecha)
          const savedBill = billsByProduct[index]
          billsByProduct[index] = {
            productoNombre: pr.nombreProducto,
            idProducto: pr.idProducto,
            fecha: cuenta.fecha,
            totalVendido:
              parseFloat(savedBill.totalVendido) + parseFloat(pr.valorTotal),
            cantidadTotal:
              parseFloat(savedBill.cantidadTotal) + parseFloat(pr.cantidad)
          }
        }
      })
    )
    return { billsByProduct: billsByProduct }
  })
)
