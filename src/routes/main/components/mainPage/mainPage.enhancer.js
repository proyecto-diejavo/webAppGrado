import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { firestoreConnect } from 'react-redux-firebase'
import { withHandlers, pure } from 'recompose'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated, RouteByRol } from 'utils/router'

const fecha = '26/10/2018'
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
  firestoreConnect(({ params }) => [
    {
      collection: 'jornada',
      where: ['fecha', '==', fecha]
    }
  ]),
  connect(({ firestore: { ordered } }) => {
    if (!ordered.jornada) return null
    return {
      jornada: ordered.jornada
    }
  }),
  spinnerWhileLoading(['jornada']),
  withRouter,
  withHandlers({
    goToRoute: ({ router, route }) => () => {
      router.push(route)
    }
  }),
  pure
)
