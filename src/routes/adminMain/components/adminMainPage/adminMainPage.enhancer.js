import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers, withStateHandlers, pure } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import { withNotifications } from 'modules/notification'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
import {
  USERS_PATH,
  JOURNEY_PATH,
  ADMIN_BAR_PATH,
  BILLS_PATH,
  PRODUCT_INVENTORY_PATH
} from 'constants'

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
    goToadminBar: ({ router }) => routes => {
      if (routes === 'Bar') {
        router.push(ADMIN_BAR_PATH)
      } else if (routes === 'Jornada') {
        router.push(JOURNEY_PATH)
      } else if (routes === 'User') {
        router.push(USERS_PATH)
      } else if (routes === 'Reportes') {
        router.push(BILLS_PATH)
      } else if (routes === 'Productos') {
        router.push(PRODUCT_INVENTORY_PATH)
      }
    }
  }),
  pure
)
