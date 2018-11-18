import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

export default compose(
  // create listener for adminBar, results go into redux
  firestoreConnect([{ collection: 'roles' }]),
  // map redux state to props
  connect(({ firestore: { data } }) => ({
    adminBar: data.adminBar
  }))
)
