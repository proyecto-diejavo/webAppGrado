import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { firestoreConnect } from 'react-redux-firebase'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  UserIsAuthenticated,
  firestoreConnect(({ params }) => [
    {
      collection: 'mesa',
      doc: params.tableId
    }
  ]),
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),

  connect(({ firestore: { data } }, { params }) => {
    const tableData = get(data, `mesa.${params.tableId}`)
    return {
      table: { ...tableData, tableId: params.tableId }
    }
  }),
  spinnerWhileLoading(['table'])
)
