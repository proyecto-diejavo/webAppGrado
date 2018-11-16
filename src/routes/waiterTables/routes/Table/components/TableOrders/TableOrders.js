import React from 'react'
import PropTypes from 'prop-types'
import { OrderCard, AddNewButton } from 'components'
import { isEmpty } from 'react-redux-firebase'
import NewOrderDialog from '../NewOrderDialog'
import classes from './TableOrders.scss'

export const TableOrders = ({
  orders,
  onClick,
  addOrder,
  newDialogOpen,
  toggleDialog
}) => (
  <div className={classes.container}>
    {!isEmpty(orders) &&
      orders.map((order, index) => (
        <OrderCard key={`orderCard-${index}`} order={order} />
      ))}
    <div>
      <AddNewButton onClick={toggleDialog} />
    </div>
    <NewOrderDialog
      onSubmit={addOrder}
      open={newDialogOpen}
      onRequestClose={toggleDialog}
    />
  </div>
)

TableOrders.propTypes = {
  orders: PropTypes.object,
  onClick: PropTypes.func,
  addOrder: PropTypes.func.isRequired,
  newDialogOpen: PropTypes.bool,
  toggleDialog: PropTypes.func.isRequired
}

export default TableOrders
