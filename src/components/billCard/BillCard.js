import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'components'
import { isEmpty } from 'react-redux-firebase'
import classes from './BillCard.scss'

export const BillCard = ({ bill }) => (
  <Card className={classes.billCard}>
    <div className={classes.products}>
      {!isEmpty(bill.productos) &&
        bill.productos.map((product, ind) => (
          <div className={classes.product}>
            <div className={classes.productName}> {product.nombreProducto}</div>
            <div className={classes.productCount}>{product.cantidad}</div>
          </div>
        ))}
    </div>
  </Card>
)

BillCard.propTypes = {
  bill: PropTypes.object.isRequired
}

export default BillCard
