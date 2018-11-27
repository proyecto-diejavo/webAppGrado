import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

import classes from './Jurney.scss'

export const Jurney = ({
  open,
  onRequestClose,
  submit,
  handleSubmit,
  data
}) => (
  <Dialog open={open} onClose={onRequestClose} fullScreen={true}>
    <form onSubmit={handleSubmit} className={classes.inputs}>
      <DialogContent>
        <DialogTitle id="simple-dialog-title">Bartender - Barra</DialogTitle>
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
                data.map(
                  (jurneys, ind) =>
                    !isEmpty(jurneys.barras) &&
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
        <DialogTitle id="simple-dialog-title">Meseros - Zonas</DialogTitle>
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
                data.map(
                  (jurneys, ind) =>
                    !isEmpty(jurneys.zona) &&
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
          Cerrar
        </Button>
      </DialogActions>
    </form>
  </Dialog>
)

Jurney.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  data: PropTypes.object
}

export default Jurney
