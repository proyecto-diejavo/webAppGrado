import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withStateHandlers, pure } from 'recompose'
import { withNotifications } from 'modules/notification'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  spinnerWhileLoading(['uid']),

  firestoreConnect(({ params, uid, idBarra }) => [
    {
      collection: 'inventarioBarra',
      where: ['idBarra', '==', idBarra]
    }
  ]),
  connect(({ firestore: { ordered } }) => ({
    inventarioBarra: ordered.inventarioBarra
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
  pure
)
