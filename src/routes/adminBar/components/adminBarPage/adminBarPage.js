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