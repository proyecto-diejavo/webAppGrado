import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'components'
import classes from './adminMainPage.scss'

export const adminMainPage = ({ adminMain }) => (
  <div>
    <Fragment>
      <div className={classes.tablesContainer}>
        <div className={classes.tables}>
          <Card className={classes.tableCard}>Usuarios</Card>
          <Card className={classes.tableCard}>Bar</Card>
          <Card className={classes.tableCard}>Jornada</Card>
          <Card className={classes.tableCard}>Inventarios</Card>
          <Card className={classes.tableCard}>Reportes</Card>
          <Card className={classes.tableCard}>Clientes</Card>
        </div>
      </div>
    </Fragment>
  </div>
)

adminMainPage.propTypes = {
  adminMain: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default adminMainPage
