import React from 'react'
import PropTypes from 'prop-types'
import classes from './waiterTablesPage.scss'

export const waiterTablesPage = ({ waiterTables }) => (
  <div className={classes.container}>
    <span>waiterTablesPage Component</span>
    <pre>{JSON.stringify(waiterTables, null, 2)}</pre>
  </div>
)

waiterTablesPage.propTypes = {
  waiterTables: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default waiterTablesPage
