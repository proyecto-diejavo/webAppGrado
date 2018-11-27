import React from 'react'
import PropTypes from 'prop-types'
import { BillCard } from 'components'
import { isEmpty } from 'react-redux-firebase'
import classes from './TableBills.scss'

const resolveState = 'por cerrar'

export const TableBills = ({ bills, changeServiceValue, closeBill }) => (
  <div className={classes.container}>
    {!isEmpty(bills) &&
      bills.map((bill, index) => (
        <BillCard
          key={`billCard-${index}`}
          bill={bill}
          onChangeService={changeServiceValue}
          closeBill={() => closeBill(bill.id, resolveState)}
        />
      ))}
  </div>
)

TableBills.propTypes = {
  bills: PropTypes.object,
  changeServiceValue: PropTypes.func,
  closeBill: PropTypes.func
}

export default TableBills
