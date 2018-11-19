import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Field } from 'redux-form'
import { TextField, SelectField, MenuItem } from 'redux-form-material-ui'
import { required } from 'utils/form'

import classes from './NewOrderDialog.scss'

class NewOrderDialog extends Component {
  state = {
    value: null
  }
  handleChange = (event, index, value) => this.setState({ value })

  render() {
    const { open, onClose, submit, handleSubmit } = this.props
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle id="simple-dialog-title">Crear Comanda</DialogTitle>
        <form onSubmit={handleSubmit} className={classes.inputs}>
          <DialogContent>
            <Field
              name="barra"
              component={TextField}
              label="Barra"
              validate={[required]}
            />
            {/* <Field
              name="driver"
              component={SelectField}
              hintText="Driver"
              floatingLabelText="Driver">
              <MenuItem value="alice@redux-pizza.com" primaryText="Alice" />
              <MenuItem value="bob@redux-pizza.com" primaryText="Bob" />
              <MenuItem value="carl@redux-pizza.com" primaryText="Carl" />
            </Field> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

NewOrderDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default NewOrderDialog
