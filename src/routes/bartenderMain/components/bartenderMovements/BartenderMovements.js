import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import classes from './BartenderMovements.scss'

export const BartenderMovements = ({ children, movimientoInventario, auth }) =>
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
          {!isEmpty(movimientoInventario) &&
            movimientoInventario.map((products, ind) =>
              products.productos.map((pr, ind) => (
                <tr>
                  <td>{pr.nombreProducto}</td>
                  <td className={classes.CenterText}>{pr.cantidad}</td>
                </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  )

BartenderMovements.propTypes = {
  children: PropTypes.object, // from react-router
  auth: PropTypes.object, // from enhancer (connect + firebaseConnect - firebase)
  movimientoInventario: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default BartenderMovements
