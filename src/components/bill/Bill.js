import React, { Component } from 'react'
import { isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import { TextField } from 'redux-form-material-ui'
import { MoneyFormat } from 'formaters'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import classes from './Bill.scss'

class Bill extends Component {
  handleChange = (id, value) => {
    this.props.onChangeService(id, value)
  }
  render() {
    const { bill, open, onClose, onSubmit } = this.props
    if (isEmpty(bill)) return null
    return (
      <Dialog open={open} onClose={onClose} fullWidth={true}>
        <DialogTitle id="simple-dialog-title">{`Cuenta ${bill.estado}`}</DialogTitle>
        <DialogContent className={classes.content}>
          <div className={classes.products}>
            {bill.productos.map((product, index) => (
              <div key={`product-${index}`} className={classes.product}>
                <div className={classes.productName}>
                  {product.nombreProducto}
                </div>
                <div className={classes.productCount}>{product.cantidad}</div>
              </div>
            ))}
          </div>
          <div className={classes.totals}>
            <div className={classes.product}>
              {'Sub Total'}
              <div className={classes.productCount}>
                {MoneyFormat(bill.subTotal)}
              </div>
            </div>
            <div className={classes.product}>
              {'IVA'}
              <div className={classes.productCount}>{MoneyFormat(bill.iva)}</div>
            </div>
            <div className={classes.product}>
              {'Servicio'}
              <div className={classes.productCount}>
                {bill.estado === 'abierta' ? (
                  <TextField
                    name="service"
                    inputProps={{
                      className: classes.service,
                      onChange: evt =>
                        this.handleChange(bill.id, evt.target.value)
                    }}
                    placeholder={MoneyFormat(bill.valorServicio)}
                  />
                ) : (
                  <div className={classes.productCount}>
                    {MoneyFormat(bill.valorServicio)}
                  </div>
                )}
              </div>
            </div>
            <div className={classes.product}>
              <b>TOTAL</b>
              <div className={classes.productCount}>
                <b>{MoneyFormat(bill.total)}</b>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          {bill.estado === 'abierta' && (
            <Button onClick={onSubmit} color="primary">
              Cerrar Cuenta
            </Button>
          )}
        </DialogActions>
      </Dialog>
    )
  }
}
Bill.propTypes = {
  bill: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeService: PropTypes.func
}

export default Bill
