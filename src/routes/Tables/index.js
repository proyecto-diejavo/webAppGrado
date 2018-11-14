import { TABLES_PATH as path } from 'constants'

export default store => ({
  path,
  getComponent(nextState, cb) {
    require.ensure(
      [],
      require => {
        const Tables = require('./components/TablesPage').default
        cb(null, Tables)
      },
      'Tables'
    )
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], require => {
      const Table = require('./routes/Table').default
      cb(null, [Table(store)])
    })
  }
})
