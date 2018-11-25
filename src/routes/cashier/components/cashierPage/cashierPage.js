import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'components'
import CashierComandas from '../cashierComandas'
import CashierBill from '../cashierBill'
import classes from './cashierPage.scss'

export const cashierPage = ({ cashier }) => (
  <div className={classes.container}>
    <Tabs
      tabsArray={[
        {
          name: 'Comandas',
          content: <CashierComandas />
        },
        {
          name: 'Cuentas',
          content: <CashierBill />
        }
      ]}
    />
  </div>
)

cashierPage.propTypes = {
  cashier: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default cashierPage