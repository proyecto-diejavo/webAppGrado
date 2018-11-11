import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import BartenderMainTitle from '../BartenderMainTitle'
import classes from './bartenderMainPage.scss'

export const bartenderMainPage = ({ children, orders, auth }) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div className={classes.container}>
      <div className={classes.tiles}>
        {!isEmpty(orders) &&
          orders.map((order, ind) => (
            <BartenderMainTitle
              key={`Comanda-${order.id}-${ind}`}
              name={order.numeroMesa}
            />
          ))}
      </div>
    </div>
  )

bartenderMainPage.propTypes = {
  children: PropTypes.object, // from react-router
  auth: PropTypes.object, // from enhancer (connect + firebaseConnect - firebase)
  orders: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default bartenderMainPage
