import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'components'
import BartenderMainDetails from '../bartenderMainDetails'
import BartenderProductsList from '../bartenderProductsList'
import BartenderMovements from '../bartenderMovements'
import classes from './bartenderMainPage.scss'

export const bartenderMainPage = ({ userBarra, inventoryProduct }) => {
  if (!userBarra) return null
  return (
    <div className={classes.container}>
      <Tabs
        tabsArray={[
          {
            name: 'Comandas',
            content: (
              <BartenderMainDetails
                idBarra={userBarra.idBarra}
                inventoryProduct={inventoryProduct}
              />
            )
          },
          {
            name: 'Inventario',
            content: <BartenderProductsList idBarra={userBarra.idBarra} />
          },
          {
            name: 'Movimientos',
            content: <BartenderMovements idBarra={userBarra.idBarra} />
          }
        ]}
      />
    </div>
  )
}

bartenderMainPage.propTypes = {
  userBarra: PropTypes.object,
  inventoryProduct: PropTypes.object
}

export default bartenderMainPage
