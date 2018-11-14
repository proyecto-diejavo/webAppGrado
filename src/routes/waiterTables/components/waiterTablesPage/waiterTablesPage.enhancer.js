import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
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
      waiterTables: zonaMesas
    }
  })
)
