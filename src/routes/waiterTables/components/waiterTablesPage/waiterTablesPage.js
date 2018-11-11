import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import classes from './waiterTablesPage.scss'

const zoneTables = zone => (
  <div>
    <p>{`Zona ${zone.zonaNumero}`}</p>
    {!isEmpty(zone.mesas) && zone.mesas.map(mesa => <div>{mesa.numero}</div>)}
  </div>
)

export const waiterTablesPage = ({ waiterTables }) => (
  <div className={classes.container}>
    <span>waiterTablesPage Component</span>
    {/* <pre>{JSON.stringify(waiterTables, null, 2)}</pre> */}
    {!isEmpty(waiterTables) && waiterTables.map(zone => zoneTables(zone))}
  </div>
)

waiterTablesPage.propTypes = {
  waiterTables: PropTypes.object
}

export default waiterTablesPage
