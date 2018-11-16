import React from 'react'
import PropTypes from 'prop-types'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import classes from './AddNewButton.scss'

export const AddNewButton = ({ onClick }) => (
  <div className={classes.container}>
    <ContentAddCircle onClick={onClick} className={classes.button} />
  </div>
)

AddNewButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default AddNewButton
