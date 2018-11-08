import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

export default compose(
  // create listener for bartenderMain, results go into redux
  firestoreConnect([{ collection: 'bartenderMain' }]),
  // map redux state to props
  connect(({ firestore: { data } }) => ({
    bartenderMain: data.bartenderMain
  }))
)
