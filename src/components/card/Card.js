import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import classNames from 'classnames/bind'
import classes from './Card.scss'

const cx = classNames.bind(classes)

export const Card = ({ children, className, onSelect, notifications }) => (
  <Fragment>
    <Paper className={cx('container', className)} onClick={onSelect}>
      {notifications > 0 && <div className={classes.notifications}>{notifications}</div>}
      {children}
    </Paper>
  </Fragment>
)

Card.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  onSelect: PropTypes.func
}

Card.defaultProps = {
  showDelete: true,
  className: '',
  onSelect: () => {}
}

export default Card
