import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

export default compose(
  // create listener for adminBar, results go into redux
  firestoreConnect([{ collection: 'barra' }]),
  // map redux state to props
  connect(({ firestore: { ordered } }) => ({
    barras: ordered.barra
  }))
)
