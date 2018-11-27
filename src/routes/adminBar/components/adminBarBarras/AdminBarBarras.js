import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { AddNewButton } from 'components'
import { isEmpty } from 'react-redux-firebase'
import DeleteIcon from '@material-ui/icons/delete'
import { required } from 'utils/form'

import classes from './AdminBarBarras.scss'
import { empty } from 'rxjs'

let textFinal = empty

class AdminBarBarras extends Component {
  handleChange = val => (textFinal = val)
  render() {
    const { barras, addBar, deleteBar } = this.props
    return (
      <div className={classes.container}>
        <div className={classes.addBarras}>
          <div className={classes.addBarrasDetails}>
            <div className={classes.divInput}>
              <Field
                fullWidth
                name="InputBarra"
                component={TextField}
                label="Nueva Barra"
                className={classes.inputDescription}
                onChange={evt => this.handleChange(evt.target.value)}
                validate={[required]}
              />
            </div>
            <div className={classes.divIcon}>
              <AddNewButton onClick={() => addBar(textFinal)} />
            </div>
          </div>
          <div>
            <table className={classes.tblProducts}>
              <thead>
                <tr>
                  <th className={classes.CenterText}>N-Barra</th>
                  <th className={classes.CenterText}>Descripción</th>
                  <th className={classes.CenterText}>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(barras) &&
                  barras.map((barra, ind) => (
                    <tr>
                      <td className={classes.CenterText}>{barra.numero}</td>
                      <td className={classes.CenterText}>
                        {barra.descripcion}
                      </td>
                      <td className={classes.CenterText}>
                        <DeleteIcon
                          key={`barra-${barra.id}-${ind}`}
                          className={classes.deleteIcon}
                          onClick={() => deleteBar(barra.id)}
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
  }
}

AdminBarBarras.propTypes = {
  barras: PropTypes.object, // from enhancer (firestoreConnect + connect)
  addBar: PropTypes.func,
  deleteBar: PropTypes.func
}

export default reduxForm({
  form: 'AdminBarBarras'
})(AdminBarBarras)
