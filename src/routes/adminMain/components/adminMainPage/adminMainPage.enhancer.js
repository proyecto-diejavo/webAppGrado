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
  firestoreConnect([{ collection: 'cuenta' }]),
  // map redux state to props
  connect(({ firestore: { data } }) => ({
    adminMain: data.adminMain
  })),
  withRouter,
  withNotifications,
  withStateHandlers(
    ({ initialDialogOpen = false }) => ({
      newDialogOpen: initialDialogOpen
    }),
    {
      toggleDialog: ({ newDialogOpen }) => () => ({
        newDialogOpen: !newDialogOpen
      })
    }
  ),
  withHandlers({
    goToadminBar: ({ router }) => () => {
      router.push(`adminBar`)
    }
  }),
  pure
)
