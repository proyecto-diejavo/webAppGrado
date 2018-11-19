import React from 'react'
import { isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import { Card } from 'components'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import classes from './Bill.scss'

export const Bill = ({ bill, open, onClose }) =>
  !isEmpty(bill) && (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="simple-dialog-title">Cuenta</DialogTitle>
      <DialogContent>
        {/* <Card className={classes.billCard}> */}
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
        {/* </Card> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={onClose} color="primary">
          Cerrar Cuenta
        </Button>
      </DialogActions>
    </Dialog>
  )

Bill.propTypes = {
  bill: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Bill
