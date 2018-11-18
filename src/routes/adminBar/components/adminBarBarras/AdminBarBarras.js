import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import { isEmpty } from 'react-redux-firebase'

import classes from './AdminBarBarras.scss'

export const AdminBarBarras = ({ barras, handleSubmit }) => (
  <div className={classes.container}>
    <div className={classes.addBarras}>
      <div className={classes.addBarrasDetails}>
        <div>
          <Field
            fullWidth
            name="displayName"
            component={TextField}
            label="Display Name"
          />
        </div>
        <div>
          <ContentAddCircle />
        </div>
      </div>
      <div>
        <table className={classes.tblProducts}>
          <thead>
            <tr>
              <th className={classes.CenterText}>N-Barra</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(barras) &&
              barras.map((barra, ind) => (
                <tr>
                  <td className={classes.CenterText}>{barra.numero}</td>
                  <td>{barra.descripcion}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

AdminBarBarras.propTypes = {
  barras: PropTypes.object, // from enhancer (firestoreConnect + connect)
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'AdminBarBarras'
})(AdminBarBarras)
