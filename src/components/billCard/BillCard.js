import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'components'
import { isEmpty } from 'react-redux-firebase'
import classes from './BillCard.scss'
import UpdateIcon from '@material-ui/icons/Update'
import CheckIcon from '@material-ui/icons/check'

const renderIcon = state => {
  if (state === 'Abierta') return <UpdateIcon className={classes.icon} />
  if (state === 'Cerrada') return <CheckIcon className={classes.icon} />
}
export const BillCard = ({ bill }) => (
  <div className={classes.container}>
    <div className={classes.header}>{renderIcon(bill.estado)}</div>
    <Card className={classes.billCard}>
      <div className={classes.products}>
        {!isEmpty(bill.productos) &&
          bill.productos.map((product, index) => (
            <div key={`billCard-${index}`} className={classes.product}>
              <div className={classes.productName}>
                {product.nombreProducto}
              </div>
              <div className={classes.productCount}>{product.cantidad}</div>
            </div>
          ))}
      </div>
    </Card>
  </div>
)

BillCard.propTypes = {
  bill: PropTypes.object.isRequired
}

export default BillCard
