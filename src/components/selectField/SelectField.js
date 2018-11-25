import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'
import classNames from 'classnames/bind'
import classes from './SelectField.scss'

const cx = classNames.bind(classes)
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

export const SelectField = ({
  input,
  label,
  meta: { touched, error },
  children
}) => (
  <Select
    inputProps={{ ...input }}
    input={
      <OutlinedInput className={cx('input', input.class)} labelWidth={0} />
    }>
    {children}
  </Select>
)

export default withStyles(styles)(SelectField)
