import React from 'react'
import { logoWhite } from 'images'
import classes from './HomePage.scss'

export const Home = () => (
  <div className={classes.container}>
    <div className="flex-column-center">
      <h2>Por favor inicia sesión</h2>
      <img alt="" src={logoWhite} className={classes.image} />
    </div>
  </div>
)

export default Home
