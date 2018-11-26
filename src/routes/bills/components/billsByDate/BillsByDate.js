import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { MoneyFormat } from 'formaters'
import classes from './billsByDate.scss'

export const billsByDate = ({ bills }) => (
  <div>
    <table className={classes.tblbills}>
      <thead>
        <tr>
          <th className={classes.CenterText}>Fecha</th>
          <th className={classes.CenterText}>Servicio</th>
          <th className={classes.CenterText}>Total</th>
        </tr>
      </thead>
      <tbody>
        {!isEmpty(bills) &&
          bills.map((bill, ind) => (
            <tr>
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

billsByDate.propTypes = {
  bills: PropTypes.object
}

export default billsByDate
