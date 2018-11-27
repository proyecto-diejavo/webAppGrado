import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { AddNewButton } from 'components'
import { isEmpty } from 'react-redux-firebase'
import DeleteIcon from '@material-ui/icons/delete'
import { required } from 'utils/form'

import classes from './AdminBarZonas.scss'
import { empty } from 'rxjs'

let textFinal = empty

class AdminBarZonas extends Component {
  handleChange = val => (textFinal = val)
  render() {
    const { zonas, addZone, deleteZone } = this.props
    return (
      <div className={classes.container}>
        <div className={classes.addBarras}>
          <div className={classes.addBarrasDetails}>
            <div className={classes.divInput}>
              <Field
                fullWidth
                name="InputZona"
                component={TextField}
                label="Nueva Zona"
                className={classes.inputDescription}
                onChange={evt => this.handleChange(evt.target.value)}
                validate={[required]}
              />
            </div>
            <div className={classes.divIcon}>
              <AddNewButton onClick={() => addZone(textFinal)} />
            </div>
          </div>
          <div>
            <table className={classes.tblProducts}>
              <thead>
                <tr>
                  <th className={classes.CenterText}>N-Zona</th>
                  <th className={classes.CenterText}>Descripción</th>
                  <th className={classes.CenterText}>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(zonas) &&
                  zonas.map((zona, ind) => (
                    <tr>
                      <td className={classes.CenterText}>{zona.numero}</td>
                      <td className={classes.CenterText}>{zona.descripcion}</td>
                      <td className={classes.CenterText}>
                        <DeleteIcon
                          key={`zona-${zona.id}-${ind}`}
                          className={classes.deleteIcon}
                          onClick={() => deleteZone(zona.id)}
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

AdminBarZonas.propTypes = {
  zonas: PropTypes.object, // from enhancer (firestoreConnect + connect)
  addZone: PropTypes.func,
  deleteZone: PropTypes.func
}

export default reduxForm({
  form: 'AdminBarBarras'
})(AdminBarZonas)
