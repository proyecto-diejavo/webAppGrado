import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import classes from './Picker.scss'

function Picker(props) {
  return (
    <div className={classes.container}>
      <Typography color="white" component="p">
        Fecha
      </Typography>
      <form className={classes.fieldContainer} noValidate>
        <TextField
          id="date"
          type="date"
          className={classes.textField}
          inputProps={{
            onChange: evt => props.onChange(evt.target.value)
          }}
        />
      </form>
    </div>
  )
}
Picker.propTypes = {
  onChange: PropTypes.func
}

export default Picker
