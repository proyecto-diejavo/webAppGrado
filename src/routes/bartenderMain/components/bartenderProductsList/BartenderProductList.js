import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import classes from './BartenderProductList.scss'

export const BartenderProductList = ({ children, inventarioBarra, auth }) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div>
      <table className={classes.tblProducts}>
        <thead>
          <tr>
            <th>Producto</th>
            <th className={classes.CenterText}>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(inventarioBarra) &&
            inventarioBarra.map((products, ind) =>
              products.productos.map((pr, ind) => (
                <tr>
                  <td>{pr.nombreProducto}</td>
                  <td className={classes.CenterText}>{pr.cantidadProducto}</td>
                </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  )

BartenderProductList.propTypes = {
  children: PropTypes.object, // from react-router
  auth: PropTypes.object, // from enhancer (connect + firebaseConnect - firebase)
  inventarioBarra: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default BartenderProductList
