import React from 'react'
import PropTypes from 'prop-types'
import { BillCard } from 'components'
import { isEmpty } from 'react-redux-firebase'
import classes from './CashierBill.scss'

export const CashierBill = ({ bills }) => (
  <div className={classes.container}>
    {!isEmpty(bills) &&
      bills.map((bill, index) => (
        <BillCard key={`billCard-${index}`} bill={bill} />
      ))}
  </div>
)

CashierBill.propTypes = {
  bills: PropTypes.object
}

export default CashierBill
