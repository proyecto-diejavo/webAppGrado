import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import classes from './BartenderProductList.scss'

export const BartenderProductList = ({ children, product, auth }) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div>
      <table className={classes.tblProducts}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(product) &&
            product.map((products, ind) => (
              <tr>
                <td>{products.nombre}</td>
                <td>{products.cantidad}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )

BartenderProductList.propTypes = {
  children: PropTypes.object, // from react-router
  auth: PropTypes.object, // from enhancer (connect + firebaseConnect - firebase)
  product: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default BartenderProductList
