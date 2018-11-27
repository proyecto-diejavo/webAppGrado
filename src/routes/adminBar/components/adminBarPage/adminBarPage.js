import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'components'
import AdminBarBarras from '../adminBarBarras'
import AdminBarMesas from '../adminBarMesas'
import AdminBarZonas from '../adminBarZonas'
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

adminBarPage.propTypes = {
  adminBar: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default adminBarPage
