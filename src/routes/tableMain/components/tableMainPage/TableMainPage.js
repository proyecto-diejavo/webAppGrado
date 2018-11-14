import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'components'
import TableOrders from '../tableOrders'
import TableBills from '../tableBills'
import classes from './TableMainPage.scss'

export const TableMainPage = ({ tableMain }) => (
  <div className={classes.container}>
    <Tabs
      tabsArray={[
        {
          name: 'Comandas',
          content: <TableOrders />
        },
        {
          name: 'Cuentas',
          content: <TableBills />
        }
      ]}
    />
  </div>
)

TableMainPage.propTypes = {
  tableMain: PropTypes.object
}

export default TableMainPage
