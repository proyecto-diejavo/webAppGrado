import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'components'
import { isEmpty } from 'react-redux-firebase'
import classes from './OrderCard.scss'
import UpdateIcon from '@material-ui/icons/Update'
import CheckIcon from '@material-ui/icons/check'
import CloseIcon from '@material-ui/icons/close'

const renderIcon = state => {
  if (state === 'Generada') return <UpdateIcon className={classes.icon} />
  if (state === 'Despachada') return <CheckIcon className={classes.icon} />
  if (state === 'Cancelada') return <CloseIcon className={classes.icon} />
}

export const OrderCard = ({ order, title }) => (
  <div className={classes.container}>
    <div className={classes.header}>
      <div className={classes.title}> {title}</div>
      {renderIcon(order.estado)}
    </div>
    <Card className={classes.orderCard}>
      <div className={classes.products}>
        {!isEmpty(order.productos) &&
          order.productos.map((product, index) => (
            <div key={`orderCard-${index}`} className={classes.product}>
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

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired
}

export default OrderCard
