import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withHandlers, withStateHandlers, pure } from 'recompose'
import { withNotifications } from 'modules/notification'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  spinnerWhileLoading(['uid']),

  firestoreConnect([{ collection: 'barra' }]),
  // map redux state to props
  connect(({ firestore: { ordered } }) => ({
    barras: ordered.barra
  })),
  withRouter,
  withNotifications,
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
    addBar: props => description => {
      const { firestore, showError, showSuccess, toggleDialog, barras } = props
      const listBarras = barras
      const lastBarra = listBarras.sort((a, b) => a.numero - b.numero).pop()
      const countNumber = lastBarra.numero + 1
      return firestore
        .add(
          { collection: 'barra' },
          {
            descripcion: description,
            numero: countNumber
          }
        )
        .then(() => {
          toggleDialog()
          showSuccess('Barra agregada correctamente')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'No se pudo agregar la mesa')
          return Promise.reject(err)
        })
    },
    deleteBar: props => barraId => {
      const { firestore, showError, showSuccess } = props
      return firestore
        .delete({ collection: 'barra', doc: barraId })
        .then(() => showSuccess('Barra eliminada correctamente'))
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'no se puedo eliminar la Barra')
          return Promise.reject(err)
        })
    }
  }),
  pure
)
