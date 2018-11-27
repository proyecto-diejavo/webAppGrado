import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers, pure } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  firestoreConnect(({ params, uid }) => [
    {
      collection: 'cuenta',
      where: ['estado', '==', 'por cerrar']
    }
  ]),
  connect(({ firestore: { ordered } }) => ({
    bills: ordered.cuenta
  })),
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
    }
  }),
  pure
)
