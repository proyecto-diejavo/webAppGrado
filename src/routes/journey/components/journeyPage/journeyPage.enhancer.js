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

  firestoreConnect([{ collection: 'jornada' }]),
  connect(({ firestore: { ordered } }) => ({
    jurney: ordered.jornada
  })),
  firestoreConnect([{ collection: 'barra' }]),
  connect(({ firestore: { ordered } }) => ({
    barra: ordered.barra
  })),
  firestoreConnect([{ collection: 'zona' }]),
  connect(({ firestore: { ordered } }) => ({
    zona: ordered.zona
  })),
  firestoreConnect([
    {
      collection: 'users'
    }
  ]),
  connect(({ firestore: { ordered } }) => {
    if (!ordered.users) return null
    return {
      mesero: ordered.users.filter(users => users.cargo === 'mesero'),
      bartender: ordered.users.filter(users => users.cargo === 'bartender')
    }
  }),
  withRouter,
  withNotifications,
  withStateHandlers(
    ({ initialDialogOpen = false }) => ({
      newDialogOpen: initialDialogOpen,
      newDialogOpen1: initialDialogOpen
    }),
    {
      toggleDialog: ({ newDialogOpen }) => () => ({
        newDialogOpen: !newDialogOpen
      }),
      toggleDialog1: ({ newDialogOpen1 }) => () => ({
        newDialogOpen1: !newDialogOpen1
      })
    }
  ),
  withHandlers({
    addJourney: props => newInstance => {
      const dateSystem = new Date()
      const { firestore, uid, showError, showSuccess, toggleDialog1 } = props
      if (!uid) {
        return showError('Debe iniciar sesión para crear una jornada')
      }
      if (Object.keys(newInstance).length === 0) {
        return showError('Debe agregar información para poder guardar')
      }
      return firestore
        .add(
          { collection: 'jornada' },
          {
            ...newInstance,
            fecha:
              dateSystem.getDate() +
              '/' +
              dateSystem.getMonth() +
              '/' +
              dateSystem.getFullYear()
          }
        )
        .then(() => {
          toggleDialog1()
          showSuccess('Jornada agregada exitosamente')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'error agredando jornada')
          return Promise.reject(err)
        })
    }
  }),
  pure
)
