import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { OrderCard } from 'components'

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
          />
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
