import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import classNames from 'classnames/bind'
import classes from './Card.scss'

const cx = classNames.bind(classes)

export const Card = ({ children, className }) => (
  <Paper className={cx('container', className)}>{children}</Paper>
)

Card.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string
}

Card.defaultProps = {
  showDelete: true,
  className: ''
}

export default Card
