import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import SignupForm from '../SignupForm'

import classes from './SignupPage.scss'

export const SignupPage = ({ emailSignup, googleLogin, onSubmitFail }) => (
  <div className={classes.container}>
    <Paper className={classes.panel}>
      <SignupForm onSubmit={emailSignup} onSubmitFail={onSubmitFail} />
    </Paper>
  </div>
)

SignupPage.propTypes = {
  emailSignup: PropTypes.func, // from enhancer (withHandlers - firebase)
  googleLogin: PropTypes.func, // from enhancer (withHandlers - firebase)
  onSubmitFail: PropTypes.func // from enhancer (reduxForm)
}

export default SignupPage
