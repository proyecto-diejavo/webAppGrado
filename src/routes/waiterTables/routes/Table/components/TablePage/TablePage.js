import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'components'
import TableOrders from '../TableOrders'
import TableBills from '../TableBills'
import Typography from '@material-ui/core/Typography'
import classes from './TablePage.scss'

export const TablePage = ({ params, table }) => (
  <div className={classes.container}>
    <Typography className={classes.title} component="h2">
      {table.numero || 'Mesa'}
    </Typography>
    <Tabs
      tabsArray={[
        {
          name: 'Comandas',
          content: <TableOrders table={params.tableId} />
        },
        {
          name: 'Cuentas',
          content: <TableBills table={params.tableId} />
        }
      ]}
    />
  </div>
)

TablePage.propTypes = {
  table: PropTypes.object,
  params: PropTypes.object.isRequired
}

export default TablePage
