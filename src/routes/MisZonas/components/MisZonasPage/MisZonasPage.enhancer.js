import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  // create listener for misZonas, results go into redux
  UserIsAuthenticated,
  // Map auth uid from state to props
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  firestoreConnect(({ params, uid }) => [
    // Listener for projects the current user created
    {
      collection: 'zona_mesas',
      where: ['usuario', '==', uid]
    }
  ]),
  // map redux state to props
  connect(({ firestore: { data } }) => ({
    zona_mesas: data.zona_mesas
  }))
)
