import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'components'
import BartenderMainDetails from '../bartenderMainDetails'
import BartenderProductsList from '../bartenderProductsList'
import classes from './bartenderMainPage.scss'

export const bartenderMainPage = ({ userBarra }) => {
  if (!userBarra) return null
  return (
    <div className={classes.container}>
      <Tabs
        tabsArray={[
          {
            name: 'Comandas',
            content: <BartenderMainDetails idBarra={userBarra.idBarra} />
          },
          {
            name: 'Inventario',
            content: <BartenderProductsList idBarra={userBarra.idBarra} />
          },
          {
            name: 'Movimientos',
            content: ''
          }
        ]}
      />
    </div>
  )
}

bartenderMainPage.propTypes = {
  userBarra: PropTypes.object
}

export default bartenderMainPage
