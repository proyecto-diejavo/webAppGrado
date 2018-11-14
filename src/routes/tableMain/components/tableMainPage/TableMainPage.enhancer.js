import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

export default compose(
  // create listener for tableMain, results go into redux
  firestoreConnect([{ collection: 'tableMain' }]),
  // map redux state to props
  connect(({ firestore: { data } }) => ({
    tableMain: data.tableMain
  }))
)
