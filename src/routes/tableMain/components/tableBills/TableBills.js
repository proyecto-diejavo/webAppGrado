import React from 'react'
import PropTypes from 'prop-types'
import { BillCard } from 'components'
import { isEmpty } from 'react-redux-firebase'
import classes from './TableBills.scss'


export const TableBills = ({ bills }) => (
  <div className={classes.container}>
    {!isEmpty(bills) && bills.map(bill => <BillCard bill={bill} />)}
  </div>
)

TableBills.propTypes = {
  bills: PropTypes.object
}

export default TableBills
