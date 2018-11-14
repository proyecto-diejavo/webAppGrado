import React from 'react'
import PropTypes from 'prop-types'
import { OrderCard } from 'components'
import { isEmpty } from 'react-redux-firebase'
import classes from './TableOrders.scss'

export const TableOrders = ({ orders }) => (
  <div className={classes.container}>
    {!isEmpty(orders) && orders.map(order => <OrderCard order={order} />)}
  </div>
)

TableOrders.propTypes = {
  orders: PropTypes.object
}

export default TableOrders
