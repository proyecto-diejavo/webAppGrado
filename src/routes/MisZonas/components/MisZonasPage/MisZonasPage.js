import React from 'react'
import PropTypes from 'prop-types'
import classes from './MisZonasPage.scss'

export const MisZonasPage = ({ zona_mesas }) => (
  <div className={classes.container}>
    <span>MisZonasPage Component</span>
    <pre>{JSON.stringify(zona_mesas, null, 2)}</pre>
  </div>
)

MisZonasPage.propTypes = {
  zona_mesas: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default MisZonasPage
