import React from 'react'
import PropTypes from 'prop-types'
import { OrderCard } from 'components'
import { isEmpty } from 'react-redux-firebase'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import NewOrderDialog from '../NewOrderDialog'
import classes from './TableOrders.scss'

const iconSize = '6rem'
const iconStyle = { width: iconSize, height: iconSize }

export const TableOrders = ({
  orders,
  onClick,
  addOrder,
  newDialogOpen,
  toggleDialog
}) => (
  <div className={classes.container}>
    {!isEmpty(orders) && orders.map(order => <OrderCard order={order} />)}
    <div>
      <ContentAddCircle style={iconStyle} onClick={toggleDialog} />
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
