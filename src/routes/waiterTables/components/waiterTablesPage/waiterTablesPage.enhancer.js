import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  firestoreConnect(({ params, uid }) => [
    {
      collection: 'zona_mesas',
      where: ['usuario', '==', uid]
    }
  ]),
  connect(({ firestore: { ordered } }) => ({
    waiterTables: ordered.zona_mesas
  }))
)
