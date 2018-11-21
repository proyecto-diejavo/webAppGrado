import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withStateHandlers, pure } from 'recompose'
import { withNotifications } from 'modules/notification'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

let idBarra = ''
export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  spinnerWhileLoading(['uid']),

  firestoreConnect(({ params, uid }) => [
    {
      collection: 'usuariosBarras',
      where: ['idUsuario', '==', uid]
    }
  ]),
  connect(({ firestore: { ordered } }) => {
    if (!ordered.usuariosBarras) return null
    idBarra = ordered.usuariosBarras[0].idBarra
    return {
      userBarra: ordered.usuariosBarras[0]
    }
  }),
  firestoreConnect(({ params, uid, ordered }) => [
    {
      collection: 'inventarioBarra',
      where: ['idBarra', '==', idBarra]
    }
  ]),
  connect(({ firestore: { ordered } }) => {
    if (!ordered.inventarioBarra) return null
    return {
      inventoryProduct: ordered.inventarioBarra
    }
  }),
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
