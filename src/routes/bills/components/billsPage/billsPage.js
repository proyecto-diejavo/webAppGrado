import React, { Component } from 'react'
import classes from './billsPage.scss'
import { Tabs, Picker } from 'components'
import BillsByWaiter from '../billsByWaiter'
import BillsByProduct from '../billsByProduct'
import BillsByDate from '../billsByDate'

class billsPage extends Component {
  state = { fecha: '' }
  onChangeDate = value => {
    const date = new Date(value)
    const formatedDate =
      (date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    this.setState({ fecha: formatedDate })
  }
  render() {
    return (
      <div>
        <Picker onChange={this.onChangeDate} />
        <div className={classes.container}>
          <Tabs
            tabsArray={[
              {
                name: 'Ventas por Fecha',
                content: <BillsByDate />
              },
              {
                name: 'Ventas por Mesero',
                content: <BillsByWaiter />
              },
              {
                name: 'Ventas por Producto',
                content: <BillsByProduct fecha={this.state.fecha} />
              }
            ]}
          />
        </div>
      </div>
    )
  }
}

export default billsPage
