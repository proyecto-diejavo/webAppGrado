import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import classes from './BartenderMainTitle.scss'

export const BartenderMainTitle = ({ name }) => (
  <Paper className={classes.container}>
    <div className={classes.top}>
      <span className={classes.name}>{name || 'No Name'}</span>
    </div>
  </Paper>
)

BartenderMainTitle.propTypes = {
  name: PropTypes.string
}

BartenderMainTitle.defaultProps = {
  showDelete: true
}

export default BartenderMainTitle
