import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { Card } from 'components'
import classes from './WaiterTablesPage.scss'

const zoneTables = zone => {
  if (!zone.mesas) return null
  const mesas = zone.mesas.sort((a, b) => a.numero - b.numero)
  return (
    <Fragment>
      <h2 className={classes.zoneTitle}>{`Zona ${zone.numeroZona}`}</h2>
      <div className={classes.tablesContainer}>
        <div className={classes.tables}>
          {mesas.map(mesa => (
            <Card className={classes.tableCard}>{mesa.numero}</Card>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export const WaiterTablesPage = ({ waiterTables }) => (
  <div className={classes.container}>
    {!isEmpty(waiterTables) && waiterTables.map(zone => zoneTables(zone))}
  </div>
)

WaiterTablesPage.propTypes = {
  waiterTables: PropTypes.object
}

export default WaiterTablesPage
