import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

export default compose(
  // create listener for users, results go into redux
  firestoreConnect([{ collection: 'users' }]),
  // map redux state to props
  connect(({ firestore: { ordered } }) => ({
    users: ordered.users
  }))
)
