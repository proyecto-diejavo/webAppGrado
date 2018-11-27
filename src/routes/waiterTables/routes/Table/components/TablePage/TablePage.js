import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'components'
import TableOrders from '../TableOrders'
import TableBills from '../TableBills'
import Typography from '@material-ui/core/Typography'
import classes from './TablePage.scss'

export const TablePage = ({ table }) => (
  <div className={classes.container}>
    {/* <Typography className={classes.title} component="h2">
      {`Mesa ${table.numero}`}
    </Typography> */}
    <Tabs
      tabsArray={[
        {
          name: 'Comandas',
          content: <TableOrders table={table} />
        },
        {
          name: 'Cuentas',
          content: <TableBills table={table} />
        }
      ]}
    />
  </div>
)

TablePage.propTypes = {
  table: PropTypes.object
}

export default TablePage
