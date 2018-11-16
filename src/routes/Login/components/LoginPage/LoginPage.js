import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import LoginForm from '../LoginForm'
import IconButton from '@material-ui/core/IconButton'
import GroupIcon from '@material-ui/icons/group'
import classes from './LoginPage.scss'

export const LoginPage = ({ emailLogin, googleLogin, onSubmitFail }) => (
  <div className={classes.container}>
    <Paper className={classes.panel}>
      <IconButton>
        <GroupIcon className={classes.iconSize} />
      </IconButton>
      <LoginForm onSubmit={emailLogin} onSubmitFail={onSubmitFail} />
    </Paper>
  </div>
)

LoginPage.propTypes = {
  emailLogin: PropTypes.func, // from enhancer (withHandlers)
  onSubmitFail: PropTypes.func, // from enhancer (withHandlers)
  googleLogin: PropTypes.func // from enhancer (withHandlers)
}

export default LoginPage
