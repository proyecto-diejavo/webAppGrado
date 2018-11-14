import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  firestoreConnect(({ params, uid }) => [
    {
      collection: 'comanda',
      where: ['idMesero', '==', uid]
    }
  ]),
  connect(({ firestore: { ordered } }) => ({
    orders: ordered.comanda
  }))
)
