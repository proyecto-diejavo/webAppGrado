import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { Field, FieldArray } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { required } from 'utils/form'
import { SelectField, AddNewButton } from 'components'
import MenuItem from '@material-ui/core/MenuItem'
import classes from './NewOrderDialog.scss'

class NewOrderDialog extends Component {
  state = { barra: '', destino: '' }
  onSelectChange = (field, id, data, name) => {
    if (!id) return
    const namedata = data
      .filter(obj => obj.id === id)
      .map(obj => {
        const { [name]: fiterName } = obj
        return fiterName
      })
      .shift()
    this.props.change(field, namedata)
  }
  renderProducts = ({ fields, meta: { error, submitFailed } }) => {
    const { productosBarra, productosCocina } = this.props
    const products =
      this.state.destino === 'cocina' ? productosCocina : productosBarra
    return (
      <Fragment>
        {fields.length > 0 && (
          <Paper className={classes.root}>
            <table className={classes.tblProducts}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Field
                          component={TextField}
                          name={`${field}.nombreProducto`}
                          type="hidden"
                          style={{ height: 0 }}
                        />
                        <Field
                          name={`${field}.idProducto`}
                          onChange={evt =>
                            this.onSelectChange(
                              `${field}.nombreProducto`,
                              evt.target.value,
                              this.props.productos,
                              'nombre'
                            )
                          }
                          component={SelectField}>
                          {products &&
                            products.map(product => (
                              <MenuItem value={product.id}>
                                {product.nombre}
                              </MenuItem>
                            ))}
                        </Field>
                      </td>
                      <td>
                        <Field
                          name={`${field}.cantidad`}
                          type="text"
                          component={TextField}
                        />
                      </td>
                      <td>
                        <Button onClick={() => fields.remove(index)} color="primary">
                          x
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Paper>
        )}
        <div>
          <AddNewButton onClick={() => fields.push({})} />
          {submitFailed && error && <span>{error}</span>}
        </div>
      </Fragment>
    )
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleChangeBar = event => {
    this.handleChange(event)
    this.onSelectChange(
      'bartender',
      event.target.value,
      this.props.barras,
      'bartender'
    )
    this.onSelectChange(
      'idBartender',
      event.target.value,
      this.props.barras,
      'idBartender'
    )
  }
  renderOrigin = () => {
    const { barras } = this.props
    if (!this.state.destino || this.state.destino !== 'barra') return null
    return (
      <div className={classes.select}>
        <Typography className={classes.title} component="p">
          Barra
        </Typography>
        <Field
          component={TextField}
          name={'bartender'}
          type="hidden"
          style={{ height: 0 }}
        />
        <Field
          component={TextField}
          name={'idBartender'}
          type="hidden"
          style={{ height: 0 }}
        />
        <Field
          name="idBarra"
          component={SelectField}
          className={classes.bar}
          label="Barra"
          value={this.state.barra}
          onChange={this.handleChangeBar}
          validate={[required]}>
          {barras &&
            barras.map(barra => (
              <MenuItem value={barra.idBarra}>{barra.numeroBarra}</MenuItem>
            ))}
        </Field>
      </div>
    )
  }
  render() {
    const { open, onClose, handleSubmit } = this.props
    return (
      <Dialog open={open} onClose={onClose} fullScreen={true}>
        <DialogTitle id="order-title">Crear Comanda</DialogTitle>
        <form onSubmit={handleSubmit} className={classes.inputs}>
          <DialogContent className={classes.content}>
            <div className={classes.filters}>
              <div className={classes.select}>
                <Typography className={classes.title} component="p">
                  Destino
                </Typography>
                <Field
                  name="destino"
                  component={SelectField}
                  value={this.state.destino}
                  onChange={this.handleChange}>
                  <MenuItem value={'barra'}>Barra</MenuItem>
                  <MenuItem value={'cocina'}>Cocina</MenuItem>
                </Field>
              </div>
              {this.renderOrigin()}
            </div>
            <FieldArray name="productos" component={this.renderProducts} />
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
  productos: PropTypes.object,
  barras: PropTypes.object,
  productosBarra: PropTypes.object,
  productosCocina: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default NewOrderDialog
