import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { required } from 'utils/form'

import classes from './NewJurney.scss'

export const NewJurney = ({
  open,
  onRequestClose,
  submit,
  handleSubmit,
  data
}) => (
  <Dialog open={open} onClose={onRequestClose}>
    <DialogTitle id="simple-dialog-title">New Project</DialogTitle>
    <form onSubmit={handleSubmit} className={classes.inputs}>
      <DialogContent>
        <Field
          name="name"
          component={TextField}
          label="Project Name"
          validate={[required]}
        />
        <div className={classes.divBarra}>
          <table className={classes.tblProducts}>
            <thead>
              <tr>
                <th>Bartender</th>
                <th>Barra</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(data) &&
                data.map((jurneys, ind) =>
                  jurneys.barras.map((barra, ind) => (
                    <tr>
                      <td>{barra.bartender}</td>
                      <td>{barra.numeroBarra}</td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
        <div className={classes.divZonas}>
          <table className={classes.tblProducts}>
            <thead>
              <tr>
                <th>Mesero</th>
                <th>Zona</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(data) &&
                data.map((jurneys, ind) =>
                  jurneys.zona.map((barra, ind) => (
                    <tr>
                      <td>{barra.mesero}</td>
                      <td>{barra.numeroZona}</td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
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

NewJurney.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleSubmit: PropTypes.func.isRequired, // added by redux-form
  submit: PropTypes.func.isRequired, // added by redux-form
  data: PropTypes.object
}

export default NewJurney
