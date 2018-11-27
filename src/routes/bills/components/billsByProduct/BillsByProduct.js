import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { MoneyFormat } from 'formaters'
import classes from './billsByProduct.scss'

export const billsByProduct = ({ billsByProduct }) => (
  <div>
    <table className={classes.tblbills}>
      <thead>
        <tr>
          <th className={classes.CenterText}>Fecha</th>
          <th className={classes.CenterText}>Producto</th>
          <th className={classes.CenterText}>Cantidad</th>
          <th className={classes.CenterText}>Total</th>
        </tr>
      </thead>
      <tbody>
        {!isEmpty(billsByProduct) &&
          billsByProduct.map((bill, ind) => (
            <tr>
              <td className={classes.CenterText}>{bill.fecha}</td>
              <td className={classes.CenterText}>{bill.productoNombre}</td>
              <td className={classes.CenterText}>{bill.cantidadTotal}</td>
              <td className={classes.CenterText}>
                {MoneyFormat(bill.totalVendido)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)

billsByProduct.propTypes = {
  billsByProduct: PropTypes.object
}

export default billsByProduct
