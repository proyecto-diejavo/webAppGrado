import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'
import { required, validateEmail } from 'utils/form'
import classes from './SignupForm.scss'

const SignupForm = ({ pristine, submitting, handleSubmit }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name="username"
      component={TextField}
      label="Nombre Usuario"
      validate={required}
    />
    <Field
      name="email"
      component={TextField}
      label="Correo"
      validate={[required, validateEmail]}
    />
    <Field
      name="numeroDocumento"
      component={TextField}
      label="Número Documento"
      validate={required}
    />
    <Field
      name="cargo"
      component={TextField}
      label="Cargo"
      validate={required}
    />
    <Field
      name="telefono"
      component={TextField}
      label="Teléfono"
      validate={required}
    />
    <Field
      name="password"
      component={TextField}
      label="Contraseña"
      type="password"
      validate={required}
    />
    <div className={classes.submit}>
      <Button
        color="primary"
        type="submit"
        raised
        disabled={pristine || submitting}>
        {submitting ? 'Loading' : 'Registrar'}
      </Button>
    </div>
  </form>
)

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form (calls onSubmit)
}

export default SignupForm
