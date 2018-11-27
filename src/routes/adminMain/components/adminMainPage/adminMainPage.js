import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'components'
import classes from './adminMainPage.scss'

export const adminMainPage = ({ adminMain, goToadminBar }) => (
  <div>
    <Fragment>
      <div className={classes.tablesContainer}>
        <div className={classes.tables}>
          <Card
            className={classes.tableCard}
            onSelect={() => goToadminBar('User')}>
            Usuarios
          </Card>
          <Card
            className={classes.tableCard}
            onSelect={() => goToadminBar('Bar')}>
            Bar
          </Card>
          <Card
            className={classes.tableCard}
            onSelect={() => goToadminBar('Jornada')}>
            Jornada
          </Card>
          <Card className={classes.tableCard}>Inventarios</Card>
          <Card
            className={classes.tableCard}
            onSelect={() => goToadminBar('Reportes')}>
            Reportes
          </Card>
          {/*<Card className={classes.tableCard}>Clientes</Card>*/}
        </div>
      </div>
    </Fragment>
  </div>
)

adminMainPage.propTypes = {
  adminMain: PropTypes.object, // from enhancer (firestoreConnect + connect)
  goToadminBar: PropTypes.func
}

export default adminMainPage
