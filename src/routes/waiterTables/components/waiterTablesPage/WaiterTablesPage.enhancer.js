import { compose } from 'redux'
import { connect } from 'react-redux'
import { WAITER_TABLES_PATH } from 'constants'
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
      zonesNot: zonaMesas
    }
  }),

  firestoreConnect(({ params, uid, table }) => [
    {
      collection: 'comanda',
      where: ['estado', '==', 'despachada']
    }
  ]),
  connect(({ firestore: { ordered } }) => {
    if (!ordered.comanda || !ordered.zona_mesas) return null
    const comandas = ordered.comanda
    const zones = ordered.zona_mesas.map(zone => ({
      ...zone,
      mesas: zone.mesas.map(mesa => ({
        ...mesa,
        notificaciones: comandas.filter(com => com.idMesa === mesa.id).length
      }))
    }))
    return { zones }
  }),
  // spinnerWhileLoading(['zones']),
  withRouter,
  withNotifications,
  withHandlers({
    goToTable: ({ router }) => tableId => {
      router.push(`${WAITER_TABLES_PATH}/${tableId}`)
    }
  }),
  pure
)
