import React, { Fragment, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { Card } from 'components'
import classes from './TablesPage.scss'

const zoneTables = (zone, goToTable) => {
  if (!zone.mesas) return null
  const mesas = zone.mesas.sort((a, b) => a.numero - b.numero)
  return (
    <Fragment>
      <h2 className={classes.zoneTitle}>{`Zona ${zone.numeroZona}`}</h2>
      <div className={classes.tablesContainer}>
        <div className={classes.tables}>
          {mesas.map(mesa => (
            <Card
              className={classes.tableCard}
              onSelect={() => goToTable(mesa.id)}>
              {mesa.numero}
            </Card>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export const TablesPage = ({ zones, goToTable, children, auth }) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div className={classes.container}>
      {!isEmpty(zones) && zones.map(zone => zoneTables(zone, goToTable))}
    </div>
  )

TablesPage.propTypes = {
  children: PropTypes.object,
  auth: PropTypes.object,
  zones: PropTypes.object,
  goToTable: PropTypes.func.isRequired
}

export default TablesPage
