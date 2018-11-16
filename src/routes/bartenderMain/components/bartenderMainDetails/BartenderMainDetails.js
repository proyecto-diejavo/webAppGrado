import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { Card } from 'components'
import IconButton from '@material-ui/core/IconButton'
import UpdateIcon from '@material-ui/icons/Update'
import CheckIcon from '@material-ui/icons/check'
import CloseIcon from '@material-ui/icons/close'
import classes from './BartenderMainDetails.scss'

const renderIcon = state => {
  if (state === 'Generada') return <UpdateIcon className={classes.IconUpdate} />
  if (state === 'Despachada')
    return <CheckIcon className={classes.IconUpdate} />
  if (state === 'Cancelada') return <CloseIcon className={classes.IconUpdate} />
}

export const BartenderMainDetails = ({ children, orders, auth, putComanda }) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div>
      {!isEmpty(orders) &&
        orders.map((order, ind) => (
          <Card>
            <div className={classes.products}>
              {!isEmpty(order.productos) &&
                order.productos.map((product, ind) => (
                  <div className={classes.product}>
                    <div className={classes.productName}>
                      {product.nombreProducto}
                    </div>
                    <div className={classes.productCount}>
                      {product.cantidad}
                    </div>
                  </div>
                ))}
            </div>
            <div className={classes.iconUpdateContent}>
              <IconButton onClick={() => putComanda(order.id, 'Despachada')}>
                {renderIcon(order.estado)}
              </IconButton>
            </div>
          </Card>
        ))}
    </div>
  )

BartenderMainDetails.propTypes = {
  children: PropTypes.object, // from react-router
  auth: PropTypes.object, // from enhancer (connect + firebaseConnect - firebase)
  orders: PropTypes.object, // from enhancer (firestoreConnect + connect)
  putComanda: PropTypes.func
}

export default BartenderMainDetails
