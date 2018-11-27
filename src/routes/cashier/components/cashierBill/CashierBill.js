import React from 'react'
import PropTypes from 'prop-types'
import { BillCard } from 'components'
import { isEmpty } from 'react-redux-firebase'
import classes from './CashierBill.scss'

const resolveState = 'cerrada'

export const CashierBill = ({ bills, closeBill }) => (
  <div className={classes.container}>
    {!isEmpty(bills) &&
      bills.map((bill, index) => (
        <BillCard
          key={`billCard-${index}`}
          bill={bill}
          cashier={true}
          closeBill={() => closeBill(bill.id, resolveState)}
        />
      ))}
  </div>
)

CashierBill.propTypes = {
  bills: PropTypes.object,
  closeBill: PropTypes.func
}

export default CashierBill
