import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'components'
import { isEmpty } from 'react-redux-firebase'
import classes from './TableOrders.scss'

const orderCard = order => {
  if (!order.productos) return null
  return (
    <Card lassName={classes.orderCard}>
      <div className={classes.products}>
        {!isEmpty(order.productos) &&
          order.productos.map((product, ind) => (
            <div className={classes.product}>
              <div className={classes.productName}>
                {product.nombreProducto}
              </div>
              <div className={classes.productCount}>{product.cantidad}</div>
            </div>
          ))}
      </div>
    </Card>
  )
}

export const TableOrders = ({ orders }) => (
  <div className={classes.container}>
    {!isEmpty(orders) && orders.map(order => orderCard(order))}
  </div>
)

TableOrders.propTypes = {
  orders: PropTypes.object
}

export default TableOrders
