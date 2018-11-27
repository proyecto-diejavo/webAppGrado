import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { TextField } from 'redux-form-material-ui'
import { Field, FieldArray } from 'redux-form'
import { SelectField, AddNewButton } from 'components'
import MenuItem from '@material-ui/core/MenuItem'

import classes from './NewJurney.scss'

class NewJurney extends Component {
  onSelectChange = (field, val) => {
    this.props.change(field, val.trim())
  }

  renderBar = ({ fields, meta: { error, submitFailed } }) => {
    const { barra, bartender } = this.props
    return (
      <div>
        <table className={classes.tblProducts}>
          <thead>
            <tr>
              <td className={classes.CenterText}>Barra</td>
              <td className={classes.CenterText}>Bartender</td>
              <td className={classes.CenterText}>Eliminar</td>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr>
                <td>
                  <Field
                    component={TextField}
                    name={`${field}.numeroBarra`}
                    type="hidden"
                    style={{ height: 0, width: 0 }}
                  />
                  <div className={classes.ajustFile}>
                    <Field
                      name={`${field}.idBarra`}
                      component={SelectField}
                      onChange={evt =>
                        this.onSelectChange(
                          `${field}.numeroBarra`,
                          evt.currentTarget.outerText
                        )
                      }>
                      {barra &&
                        barra.map(barras => (
                          <MenuItem value={barras.id}>{barras.numero}</MenuItem>
                        ))}
                    </Field>
                  </div>
                </td>
                <td>
                  <Field
                    component={TextField}
                    name={`${field}.bartender`}
                    type="hidden"
                    style={{ height: 0 }}
                  />
                  <div className={classes.ajustFile}>
                    <Field
                      name={`${field}.idBartender`}
                      component={SelectField}
                      onChange={evt =>
                        this.onSelectChange(
                          `${field}.bartender`,
                          evt.currentTarget.outerText
                        )
                      }>
                      {bartender &&
                        bartender.map(bartenders => (
                          <MenuItem value={bartenders.id}>
                            {bartenders.username}
                          </MenuItem>
                        ))}
                    </Field>
                  </div>
                </td>
                <td>
                  <Button onClick={() => fields.remove(index)} color="primary">
                    x
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddNewButton onClick={() => fields.push({})} />
      </div>
    )
  }

  renderZone = ({ fields, meta: { error, submitFailed } }) => {
    const { mesero, zona } = this.props
    return (
      <div>
        <table className={classes.tblProducts}>
          <thead>
            <tr>
              <td className={classes.CenterText}>Zona</td>
              <td className={classes.CenterText}>Mesero</td>
              <td className={classes.CenterText}>Eliminar</td>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr>
                <td>
                  <Field
                    component={TextField}
                    name={`${field}.numeroZona`}
                    type="hidden"
                    style={{ height: 0 }}
                  />
                  <div className={classes.ajustFile}>
                    <Field
                      name={`${field}.idZona`}
                      component={SelectField}
                      className={classes.ajustFile}
                      onChange={evt =>
                        this.onSelectChange(
                          `${field}.numeroZona`,
                          evt.currentTarget.outerText
                        )
                      }>
                      {zona &&
                        zona.map(zonas => (
                          <MenuItem value={zonas.id}>{zonas.numero}</MenuItem>
                        ))}
                    </Field>
                  </div>
                </td>
                <td>
                  <Field
                    component={TextField}
                    name={`${field}.mesero`}
                    type="hidden"
                    style={{ height: 0 }}
                  />
                  <div className={classes.ajustFile}>
                    <Field
                      name={`${field}.idMesero`}
                      component={SelectField}
                      onChange={evt =>
                        this.onSelectChange(
                          `${field}.mesero`,
                          evt.currentTarget.outerText
                        )
                      }>
                      {mesero &&
                        mesero.map(meseros => (
                          <MenuItem value={meseros.id}>
                            {meseros.username}
                          </MenuItem>
                        ))}
                    </Field>
                  </div>
                </td>
                <td>
                  <Button onClick={() => fields.remove(index)} color="primary">
                    x
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddNewButton onClick={() => fields.push({})} />
      </div>
    )
  }

  render() {
    const { open, onRequestClose, handleSubmit } = this.props
    return (
      <Dialog open={open} onClose={onRequestClose} fullScreen={true}>
        <form onSubmit={handleSubmit} className={classes.inputs}>
          <DialogContent>
            <DialogTitle id="simple-dialog-title">
              Bartender - Barra
            </DialogTitle>
            <FieldArray name="barras" component={this.renderBar} />
            <DialogTitle id="simple-dialog-title">Meseros - Zonas</DialogTitle>
            <FieldArray name="zona" component={this.renderZone} />
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
  }
}

NewJurney.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleSubmit: PropTypes.func.isRequired,
  barra: PropTypes.object,
  mesero: PropTypes.object,
  zona: PropTypes.object,
  bartender: PropTypes.object
}

export default NewJurney
