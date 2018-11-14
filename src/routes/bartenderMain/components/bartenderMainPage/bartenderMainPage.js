import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'components'
import BartenderMainCard from '../bartenderMainDetails'
import BartenderProductsList from '../bartenderProductsList'
import classes from './bartenderMainPage.scss'

export const bartenderMainPage = ({ children, auth }) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div className={classes.container}>
      <Tabs
        tabsArray={[
          {
            name: 'Comandas',
            content: <BartenderMainCard />
          },
          {
            name: 'Inventario',
            content: <BartenderProductsList />
          },
          {
            name: 'Movimientos',
            content: ''
          }
        ]}
      />
    </div>
  )

bartenderMainPage.propTypes = {
  children: PropTypes.object, // from react-router
  auth: PropTypes.object // from enhancer (connect + firebaseConnect - firebase)
}

export default bartenderMainPage
