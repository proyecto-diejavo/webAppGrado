import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { OrderCard } from 'components'

const resolveState = 'despachada'
export const BartenderMainDetails = ({
  children,
  orders,
  auth,
  putComanda,
  inventoryProduct
}) =>
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
            onClick={() =>
              putComanda(
                order.id,
                resolveState,
                order.productos,
                order.idBarra,
                inventoryProduct
              )
            }
            textModal={'¿Desea despachar la comanda?'}
          />
        ))}
    </div>
  )

BartenderMainDetails.propTypes = {
  children: PropTypes.object,
  auth: PropTypes.object,
  orders: PropTypes.object,
  putComanda: PropTypes.func,
  inventoryProduct: PropTypes.object
}

export default BartenderMainDetails
