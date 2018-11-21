import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Field, FieldArray } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { required } from 'utils/form'
import { SelectField } from 'components'
import MenuItem from '@material-ui/core/MenuItem'
import classes from './NewOrderDialog.scss'

const renderProducts = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    {fields.map((product, index) => (
      <li key={index}>
        <Button onClick={() => fields.remove(index)} color="primary">
          Remove
        </Button>
        <h4>Product #{index + 1}</h4>
        <Field
          name={`${product}.idProducto`}
          component={SelectField}
          label="Producto">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'55x7MI8Bhj8l1SCynL6L'}>Botella Aguardiente Antioqueño X 300ml</MenuItem>
          <MenuItem value={'swWBeJnLfPvBCz7BvnUf'}>Botella Ron Bacardi X 700ml</MenuItem>
          <MenuItem value={'vCGDXocjJtOIGUUoZcAN'}>Agua Cristal X 150ml</MenuItem>
        </Field>
        <Field
          name={`${product}.cantidad`}
          type="text"
          component={TextField}
          label="cantidad"
        />
      </li>
    ))}
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Agregar
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
  </ul>
)

class NewOrderDialog extends Component {
  state = { barra: '' }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { open, onClose, handleSubmit } = this.props
    return (
      <Dialog open={open} onClose={onClose} fullWidth={true}>
        <DialogTitle id="order-title">Crear Comanda</DialogTitle>
        <form onSubmit={handleSubmit} className={classes.inputs}>
          <DialogContent>
            <Field
              name="idBarra"
              component={SelectField}
              label="Barra"
              value={this.state.barra}
              onChange={this.handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'aKrNooCLqfezpo2CfeU7'}>1</MenuItem>
              <MenuItem value={'x6YXtpvtG2VibYYZluqr'}>2</MenuItem>
            </Field>
            <FieldArray name="productos" component={renderProducts} />
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
