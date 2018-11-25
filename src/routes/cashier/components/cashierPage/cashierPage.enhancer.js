import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

export default compose(
  // create listener for cashier, results go into redux
  firestoreConnect([{ collection: 'cashier' }]),
  // map redux state to props
  connect(({ firestore: { data } }) => ({
    cashier: data.cashier
  }))
)
