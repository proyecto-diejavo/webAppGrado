import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers, withStateHandlers, pure } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import { withNotifications } from 'modules/notification'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  spinnerWhileLoading(['uid']),
  firestoreConnect(({ params, uid }) => [
    {
      collection: 'productos',
      where: ['activo', '==', true],
      orderby: ['origen', 'desc']
    }
  ]),
  connect(({ firestore: { ordered } }) => ({
    products: ordered.productos
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
    deleteProduct: props => productId => {
      const { firestore, showError, showSuccess } = props
      return firestore
        .delete({ collection: 'productos', doc: productId })
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
