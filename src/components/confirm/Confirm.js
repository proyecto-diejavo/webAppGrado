import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

export const Confirm = ({ open, message, onCancel, onConfirm }) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{message}</DialogTitle>
    <DialogActions>
      <Button onClick={onCancel} color="secondary">
        Cancelar
      </Button>
      <Button onClick={onConfirm} color="primary">
        Aceptar
      </Button>
    </DialogActions>
  </Dialog>
)

Confirm.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

export default Confirm
