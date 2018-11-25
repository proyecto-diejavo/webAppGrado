import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'components'
import AdminBarBarras from '../adminBarBarras'
import AdminBarMesas from '../adminBarMesas'
import classes from './adminBarPage.scss'

export const adminBarPage = ({ adminBar }) => (
  <div className={classes.container}>
    <Tabs
      tabsArray={[
        {
          name: 'Barras',
          content: <AdminBarBarras />
        },
        {
          name: 'Zonas',
          content: ''
        },
        {
          name: 'Mesas',
          content: <AdminBarMesas />
        }
      ]}
    />
  </div>
)

adminBarPage.propTypes = {
  adminBar: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default adminBarPage
