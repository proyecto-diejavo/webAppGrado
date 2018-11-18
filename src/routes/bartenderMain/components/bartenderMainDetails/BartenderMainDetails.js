import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { OrderCard } from 'components'

const resolveState = 'Despachada'
export const BartenderMainDetails = ({ children, orders, auth, putComanda }) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div>
      {!isEmpty(orders) &&
        orders.map((order, index) => (
          <OrderCard
            key={`orderCard-${index}`}
            order={order}
            title={`Mesa ${order.numeroMesa}`}
            onClick={() => putComanda(order.id, resolveState)}
          />
        ))}
    </div>
  )

BartenderMainDetails.propTypes = {
  children: PropTypes.object,
  auth: PropTypes.object,
  orders: PropTypes.object,
  putComanda: PropTypes.func
}

export default BartenderMainDetails
