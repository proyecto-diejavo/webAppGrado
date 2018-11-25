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
  // create listener for cuenta, results go into redux
  firestoreConnect([
    { collection: 'comanda', where: ['estado', '==', 'Por Cancelar'] }
  ]),
  // map redux state to props
  connect(({ firestore: { ordered } }) => ({
    cuenta: ordered.comanda
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
    putComanda: props => (id, estado) => {
      const { firestore, uid, showError, showSuccess } = props
      if (!uid) {
        return showError('Error confirmando la cancelación.')
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
