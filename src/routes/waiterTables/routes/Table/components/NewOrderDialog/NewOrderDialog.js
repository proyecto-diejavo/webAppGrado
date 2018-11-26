import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Field, FieldArray } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { required } from 'utils/form'
import { SelectField, AddNewButton } from 'components'
import MenuItem from '@material-ui/core/MenuItem'
import classes from './NewOrderDialog.scss'

class NewOrderDialog extends Component {
  state = { barra: '', origen: '' }

  renderProducts = ({ fields, meta: { error, submitFailed } }) => {
    const { productosBarra, productosCocina } = this.props
    const products =
      this.state.origen === 'cocina' ? productosCocina : productosBarra
    return (
      <Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>Producto</TableCell>
                <TableCell className={classes.tableCell}>Cantidad</TableCell>
                <TableCell className={classes.tableCell}>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className={classes.tableCell}>
                      <Field name={`${product}.idProducto`} component={SelectField}>
                        {products &&
                          products.map(product => (
                            <MenuItem value={product.id}>{product.nombre}</MenuItem>
                          ))}
                      </Field>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Field
                        name={`${product}.cantidad`}
                        type="text"
                        component={TextField}
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Button onClick={() => fields.remove(index)} color="primary">
                        x
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
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
  renderOrigin = () => {
    const { barras } = this.props
    if (!this.state.origen || this.state.origen !== 'barra') return null
    return (
      <div className={classes.select}>
        <Typography className={classes.title} component="p">
          Barra
        </Typography>
        <Field
          name="idBarra"
          component={SelectField}
          label="Barra"
          value={this.state.barra}
          onChange={this.handleChange}>
          {barras &&
            barras.map(barra => (
              <MenuItem value={barra.id}>{barra.numero}</MenuItem>
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
                  name="origen"
                  component={SelectField}
                  value={this.state.origen}
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
  barras: PropTypes.object,
  productosBarra: PropTypes.object,
  productosCocina: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default NewOrderDialog
