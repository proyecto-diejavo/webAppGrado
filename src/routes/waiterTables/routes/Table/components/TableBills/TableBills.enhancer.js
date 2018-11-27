import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers, pure } from 'recompose'
import { withNotifications } from 'modules/notification'
import { firestoreConnect } from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  firestoreConnect(({ params, uid, table }) => [
    {
      collection: 'cuenta',
      where: [['idMesero', '==', uid], ['idMesa', '==', table.tableId]]
    }
  ]),
  connect(({ firestore: { ordered } }) => ({
    bills: ordered.cuenta
  })),
  withNotifications,
  withHandlers({
    closeBill: props => (id, estado) => {
      const { firestore, uid, showError, showSuccess } = props
      if (!uid) {
        return showError('Error cambiando el estado')
      }
      return firestore
        .update(
          { collection: 'cuenta', doc: id },
          {
            estado: estado
          }
        )
        .then(() => {
          showSuccess('¡Cuenta cerrada!')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'No se acctualizo el estado')
          return Promise.reject(err)
        })
    },
    changeServiceValue: props => (id, serviceValue) => {
      const { firestore, uid, showError, bills } = props
      if (!uid) {
        return showError('Error cambiando el estado')
      }
      const currentBill = bills.filter(bill => bill.id === id).shift()
      const subTotal = parseFloat(currentBill.subTotal)
      const iva = parseFloat(currentBill.iva)
      const newTotal = subTotal + iva + parseFloat(serviceValue)
      return firestore
        .update(
          { collection: 'cuenta', doc: id },
          {
            valorServicio: serviceValue,
            total: newTotal
          }
        )
        .then(() => {})
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'No se acctualizo el valor del servicio')
          return Promise.reject(err)
        })
    }
  }),
  pure
)
