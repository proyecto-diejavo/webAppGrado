import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withHandlers, withStateHandlers, pure } from 'recompose'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  firestoreConnect(({ params, uid, table }) => [
    {
      collection: 'comanda',
      where: [['idMesero', '==', uid], ['idMesa', '==', table]]
    }
  ]),
  connect(({ firestore: { ordered } }) => ({
    orders: ordered.comanda
  })),
  // spinnerWhileLoading(['orders']),
  withStateHandlers(
    ({ initialDialogOpen = false }) => ({
      newDialogOpen: initialDialogOpen
    }),
    {
      toggleDialog: ({ newDialogOpen }) => () => ({
        newDialogOpen: !newDialogOpen
      })
    }
  ),
  withHandlers({
    addOrder: props => newInstance => {
      const {
        firestore,
        uid,
        table,
        showError,
        showSuccess,
        toggleDialog
      } = props
      if (!uid) {
        return showError('inicia sesión para crear una comanda')
      }
      return firestore
        .add(
          { collection: 'comanda' },
          {
            ...newInstance,
            idMesero: uid,
            idMesa: table,
            estado: 'Creada',
            fecha: firestore.FieldValue.serverTimestamp()
          }
        )
        .then(() => {
          toggleDialog()
          showSuccess('¡Comanda creada!')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'La comanda no se ha podido registrar')
          return Promise.reject(err)
        })
    }
  }),
  pure
)
