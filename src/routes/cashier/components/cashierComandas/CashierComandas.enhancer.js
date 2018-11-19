import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

export default compose(
  // create listener for cuenta, results go into redux
  firestoreConnect([
    { collection: 'comanda', where: ['estado', '==', 'Por Cancelar'] }
  ]),
  // map redux state to props
  connect(({ firestore: { ordered } }) => ({
    cuenta: ordered.comanda
  }))
)
