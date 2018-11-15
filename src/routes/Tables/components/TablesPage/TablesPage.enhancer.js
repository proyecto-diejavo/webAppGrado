import { compose } from 'redux'
import { connect } from 'react-redux'
import { TABLES_PATH } from 'constants'
import { firestoreConnect } from 'react-redux-firebase'
import { withNotifications } from 'modules/notification'
import { withHandlers, pure } from 'recompose'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  firestoreConnect(({ params, uid }) => [
    {
      collection: 'zona_mesas',
      where: ['idMesero', '==', uid]
    }
  ]),
  connect(({ firestore: { ordered } }) => {
    if (!ordered.zona_mesas) return null
    const zonaMesas = ordered.zona_mesas.sort(
      (a, b) => a.numeroZona - b.numeroZona
    )
    return {
      zones: zonaMesas
    }
  }),
  spinnerWhileLoading(['zones']),
  withRouter,
  withNotifications,
  withHandlers({
    goToTable: ({ router }) => tableId => {
      router.push(`${TABLES_PATH}/${tableId}`)
    }
  }),
  pure
)
