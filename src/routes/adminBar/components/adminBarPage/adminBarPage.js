import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tabs, SelectField, AddNewButton } from 'components'
import AdminBarBarras from '../adminBarBarras'
import Button from '@material-ui/core/Button'
import AdminBarMesas from '../adminBarMesas'
import AdminBarZonas from '../adminBarZonas'
import { TextField } from 'redux-form-material-ui'
import { Field, reduxForm, FieldArray } from 'redux-form'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@material-ui/core/MenuItem'

import classes from './adminBarPage.scss'

class adminBarPage extends Component {
  onSelectChange = (field, val) => {
    this.props.change(field, val.trim())
  }

  renderBar = ({ fields, meta: { error, submitFailed } }) => {
    const { zonas, mesa } = this.props
    return (
      <div className={classes.container}>
        <Tabs
          tabsArray={[
            {
              name: 'Barras',
              content: <AdminBarBarras />
            },
            {
              name: 'Zonas',
              content: <AdminBarZonas />
            },
            {
              name: 'Mesas',
              content: <AdminBarMesas />
            }
          ]}
        />
        <div className={classes.ContentDiv}>
          <div>
            <DialogTitle id="simple-dialog-title" className={classes.Tittle}>Meseros - Zonas</DialogTitle>
            <div>
              <Field
                component={TextField}
                name={'numeroZona'}
                type="hidden"
                style={{ height: 0 }}
              />
              <div className={classes.ajustFile}>
                <Field
                  name={'idZona'}
                  component={SelectField}
                  className={classes.ajustFile}
                  onChange={evt =>
                    this.onSelectChange('numeroZona', evt.currentTarget.outerText)
                  }>
                  {zonas &&
                    zonas.map(zona => (
                      <MenuItem value={zona.id}>{zona.numero}</MenuItem>
                    ))}
                </Field>
              </div>
            </div>
          </div>
          <div className={classes.divContents}>
            <table className={classes.tblProducts}>
              <thead>
                <tr>
                  <td className={classes.CenterText}>Mesa</td>
                  <td className={classes.CenterText}>Eliminar</td>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr>
                    <td>
                      <Field
                        component={TextField}
                        name={`${field}.mesa`}
                        type="hidden"
                        style={{ height: 0 }}
                      />
                      <div className={classes.ajustFile}>
                        <Field
                          name={`${field}.idmesa`}
                          component={SelectField}
                          onChange={evt =>
                            this.onSelectChange(
                              `${field}.mesa`,
                              evt.currentTarget.outerText
                            )
                          }>
                          {mesa &&
                            mesa.map(mesas => (
                              <MenuItem value={mesas.id}>{mesas.numero}</MenuItem>
                            ))}
                        </Field>
                      </div>
                    </td>
                    <td>
                      <Button
                        onClick={() => fields.remove(index)}
                        color="primary">
                        x
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <AddNewButton onClick={() => fields.push({})} />
          </div>
        </div>
      </div>
    )
  }

  render() {
    return <FieldArray name="zona" component={this.renderBar} />
  }
}

adminBarPage.propTypes = {
  zonas: PropTypes.object,
  mesa: PropTypes.object
}

export default reduxForm({
  form: 'adminBarPage'
})(adminBarPage)
