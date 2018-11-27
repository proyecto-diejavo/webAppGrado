import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

export default compose(
  // create listener for adminBar, results go into redux
  firestoreConnect([{ collection: 'zona' }]),
  // map redux state to props
  connect(({ firestore: { ordered } }) => ({
    zonas: ordered.zona
  })),
  firestoreConnect([{ collection: 'mesa' }]),
  // map redux state to props
  connect(({ firestore: { ordered } }) => ({
    mesas: ordered.mesa
  }))
)
