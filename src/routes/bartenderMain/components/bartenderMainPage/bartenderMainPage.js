import React from 'react'
import PropTypes from 'prop-types'
import classes from './bartenderMainPage.scss'

export const bartenderMainPage = ({ bartenderMain }) => (
  <div className={classes.container}>
    <span>bartenderMainPage Component</span>
    <pre>{JSON.stringify(bartenderMain, null, 2)}</pre>
  </div>
)

bartenderMainPage.propTypes = {
  bartenderMain: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default bartenderMainPage
