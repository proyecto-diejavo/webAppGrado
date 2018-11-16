import React from 'react'
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

export const NewOrderDialog = ({
  open,
  onRequestClose,
  submit,
  handleSubmit
}) => (
  <Dialog open={open} onClose={onRequestClose}>
    <DialogTitle id="simple-dialog-title">Crear Comanda</DialogTitle>
    <form onSubmit={handleSubmit} className={classes.inputs}>
      <DialogContent>
        <Field
          name="idBarragina"
          component={TextField}
          label="Barra"
          validate={[required]}
        />
        <Field
          name="idBarraginwa"
          component={TextField}
          label="Barra"
          validate={[required]}
        />
        <Field
          name="idBarragqweina"
          component={TextField}
          label="Barra"
          validate={[required]}
        />
        <div>
          <Field
            name="favoriteColor"
            component={SelectField}
            label="Favorite Color">
            <MenuItem value="ff0000" primaryText="Red" />
            <MenuItem value="00ff00" primaryText="Green" />
            <MenuItem value="0000ff" primaryText="Blue" />
          </Field>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRequestClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Create
        </Button>
      </DialogActions>
    </form>
  </Dialog>
)

NewOrderDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
}

export default NewOrderDialog
