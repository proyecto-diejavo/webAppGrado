import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers, withStateHandlers, pure } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import { withNotifications } from 'modules/notification'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  // redirect to /login if user is not logged in
  UserIsAuthenticated,
  // Map auth uid from state to props
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  // Wait for uid to exist before going further
  spinnerWhileLoading(['uid']),
  // Create listeners based on current users UID
  firestoreConnect(() => [
    // Listener for projects the current user created
    {
      collection: 'mesa',
      orderBy: 'numero'
    }
  ]),
  // Map projects from state to props
  connect(({ firestore: { ordered } }) => ({
    mesa: ordered.mesa
  })),
  // Show loading spinner while projects and collabProjects are loading
  spinnerWhileLoading(['mesa']),
  // Add props.router
  withRouter,
  // Add props.showError and props.showSuccess
  withNotifications,
  // Add state and state handlers as props
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
    addMesa: props => () => {
      const { firestore, showError, showSuccess, toggleDialog, mesa } = props
      const lastMesa = mesa.sort((a, b) => a.numero - b.numero).pop()
      const countNumber = lastMesa.numero + 1
      return firestore
        .add(
          { collection: 'mesa' },
          {
            numero: countNumber
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
    },
    deleteMesa: props => mesaId => {
      const { firestore, showError, showSuccess } = props
      return firestore
        .delete({ collection: 'mesa', doc: mesaId })
        .then(() => showSuccess('Project deleted successfully'))
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not delete project')
          return Promise.reject(err)
        })
    }
  }),
  pure
)
