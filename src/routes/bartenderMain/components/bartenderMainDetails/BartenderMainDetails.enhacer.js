import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withHandlers, withStateHandlers, pure } from 'recompose'
import { withNotifications } from 'modules/notification'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

const newLocal = this;
export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  spinnerWhileLoading(['uid']),

  firestoreConnect(({ params, uid }) => [
    {
      collection: 'comanda',
      where: [
        ['idBartender', '==', uid],
        ['idBarra', '==', 'aKrNooCLqfezpo2CfeU7']
      ]
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
    putComanda: props => (id, estado) => {
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
          postMovimiento()
          showSuccess('Comanda actualizada correctamente')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'No se acctualizo el estado')
          return Promise.reject(err)
        })
    },
    postMovimiento: props => {
      const { firestore, showError, showSuccess, toggleDialog } = props
      return firestore
        .add(
          { collection: 'projects' },
          {
            createdBy: 'Javier',
            createdAt: firestore.FieldValue.serverTimestamp()
          }
        )
        .then(() => {
          toggleDialog()
          showSuccess('Project added successfully')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not add project')
          return Promise.reject(err)
        })
    }
  }),
  pure
)
