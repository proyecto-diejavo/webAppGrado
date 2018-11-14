export default store => ({
  path: ':tableId',
  getComponent(nextState, cb) {
    require.ensure(
      [],
      require => {
        const Table = require('./components/TablePage').default
        cb(null, Table)
      },
      'Table'
    )
  }
})
