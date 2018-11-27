import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import { isEmpty } from 'react-redux-firebase'
import DeleteIcon from '@material-ui/icons/delete'
import classes from './productInventoryPage.scss'
import { MoneyFormat } from 'formaters'

export const productInventoryPage = ({ products, deleteProduct }) => (
  <div className={classes.container}>
    <div className={classes.addBarras}>
      <div>
        <table className={classes.tblProducts}>
          <thead>
            <tr>
              <th className={classes.CenterText}>Producto</th>
              <th className={classes.CenterText}>Cantidad</th>
              <th className={classes.CenterText}>Origen</th>
              <th className={classes.CenterText}>Valor Unitario</th>
              <th className={classes.CenterText}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(products) &&
              products.map((product, ind) => (
                <tr>
                  <td>{product.nombre}</td>
                  <td className={classes.CenterText}>{product.cantidad}</td>
                  <td className={classes.CenterText}>{product.origen}</td>
                  <td className={classes.CenterText}>
                    {MoneyFormat(product.valorUnitario)}
                  </td>
                  <td className={classes.CenterText}>
                    <DeleteIcon
                      key={`Producto-${product.id}-${ind}`}
                      className={classes.deleteIcon}
                      onClick={() => deleteProduct(product.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

productInventoryPage.propTypes = {
  products: PropTypes.object // from enhancer (firestoreConnect + connect)
}
export default reduxForm({
  form: 'productInventoryPage'
})(productInventoryPage)
