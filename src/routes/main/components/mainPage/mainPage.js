import React from 'react'
import PropTypes from 'prop-types'
import { logoWhite } from 'images'
import classes from './mainPage.scss'

export const mainPage = ({ username, goToRoute }) => {
  setTimeout(() => {
    goToRoute()
  }, 3000)
  return (
    <div className={classes.container}>
      <div className="flex-column-center">
        <h2>{`¡Bienvenido ${username}!`}</h2>
        <img alt="" src={logoWhite} className={classes.image} />
      </div>
    </div>
  )
}

mainPage.propTypes = {
  username: PropTypes.string,
  goToRoute: PropTypes.func
}

export default mainPage
