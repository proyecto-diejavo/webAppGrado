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

  firestoreConnect([{ collection: 'zona' }]),
  // map redux state to props
  connect(({ firestore: { ordered } }) => ({
    zonas: ordered.zona
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
    addZone: props => description => {
      const { firestore, showError, showSuccess, toggleDialog, zonas } = props
      const listZonas = zonas
      const lastZonas = listZonas.sort((a, b) => a.numero - b.numero).pop()
      const countNumber = lastZonas.numero + 1
      return firestore
        .add(
          { collection: 'zona' },
          {
            descripcion: description,
            numero: countNumber
          }
        )
        .then(() => {
          toggleDialog()
          showSuccess('Zona agregada correctamente')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'No se pudo agregar la zona')
          return Promise.reject(err)
        })
    },
    deleteZone: props => ZoneId => {
      const { firestore, showError, showSuccess } = props
      return firestore
        .delete({ collection: 'zona', doc: ZoneId })
        .then(() => showSuccess('Zona eliminada correctamente'))
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'no se puedo eliminar la Zona')
          return Promise.reject(err)
        })
    }
  }),
  pure
)
