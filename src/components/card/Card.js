import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import classes from './Card.scss'

export const Card = ({ children }) => (
  <Paper className={classes.container}>
    <div className={classes.top}> {children}</div>
  </Paper>
)

Card.propTypes = {
  children: PropTypes.element
}

Card.defaultProps = {
  showDelete: true
}

export default Card
