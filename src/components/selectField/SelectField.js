import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'

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
    name="numero"
    inputProps={{ ...input }}
    input={<OutlinedInput labelWidth={0} />}>
    {children}
  </Select>
)

export default withStyles(styles)(SelectField)
