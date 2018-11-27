import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import { isEmpty } from 'react-redux-firebase'

import classes from './AdminInventory.scss'

export const AdminInventory = ({ products }) => (
  <div className={classes.container}>
    <div className={classes.addBarras}>
      <div className={classes.addBarrasDetails}>
        <div className={classes.divInput}>
          <Field
            fullWidth
            name="displayName"
            component={TextField}
            label="Display Name"
            className={classes.inputDescription}
          />
        </div>
        <div className={classes.divIcon}>
          <ContentAddCircle />
        </div>
      </div>
      <div>
        <table className={classes.tblProducts}>
          <thead>
            <tr>
              <th className={classes.CenterText}>Producto</th>
              <th className={classes.CenterText}>Cantidad</th>
              <th className={classes.CenterText}>Valor Unitario</th>
              <th className={classes.CenterText}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(products) &&
              products.map((product, ind) => (
                <tr>
                  <td className={classes.CenterText}>{product.nombre}</td>
                  <td className={classes.CenterText}>{product.cantidad}</td>
                  <td className={classes.CenterText}>
                    {product.valorUnitario}
                  </td>
                  <td className={classes.CenterText}>{product.cantidad}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

AdminInventory.propTypes = {
  products: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default reduxForm({
  form: 'AdminInventory'
})(AdminInventory)
