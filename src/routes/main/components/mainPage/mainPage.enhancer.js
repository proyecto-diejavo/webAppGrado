import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { firestoreConnect } from 'react-redux-firebase'
import { withHandlers, pure } from 'recompose'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated, RouteByRol } from 'utils/router'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  spinnerWhileLoading(['uid']),

  firestoreConnect(({ uid }) => [
    {
      collection: 'users',
      doc: uid
    }
  ]),
  connect(({ firestore: { data } }, { uid }) => {
    if (!data.users) return null
    const user = get(data, `users.${uid}`)
    if (!user) return null
    const route = RouteByRol(user.cargo)
    return {
      route,
      username: user.username
    }
  }),
  withRouter,
  withHandlers({
    goToRoute: ({ router, route }) => () => {
      router.push(route)
    }
  }),
  pure
)
