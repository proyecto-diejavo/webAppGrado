import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

export default compose(
  // create listener for adminMain, results go into redux
  firestoreConnect([{ collection: 'cuenta' }]),
  // map redux state to props
  connect(({ firestore: { data } }) => ({
    adminMain: data.adminMain
  }))
)
