import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { MoneyFormat } from 'formaters'
import classes from './BillsByWaiter.scss'

export const BillsByWaiter = ({ billsByWaiter }) => (
  <div>
    <table className={classes.tblbills}>
      <thead>
        <tr>
          <th className={classes.CenterText}>Nombre Usuario</th>
          <th className={classes.CenterText}>Fecha</th>
          <th className={classes.CenterText}>Servicio</th>
          <th className={classes.CenterText}>Total</th>
        </tr>
      </thead>
      <tbody>
        {!isEmpty(billsByWaiter) &&
          billsByWaiter.map((bill, ind) => (
            <tr>
              <td className={classes.CenterText}>{bill.mesero}</td>
              <td className={classes.CenterText}>{bill.fecha}</td>
              <td className={classes.CenterText}>
                {MoneyFormat(bill.valorServicio)}
              </td>
              <td className={classes.CenterText}>{MoneyFormat(bill.total)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)

BillsByWaiter.propTypes = {
  billsByWaiter: PropTypes.object
}

export default BillsByWaiter
