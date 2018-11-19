import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Confirm } from 'components'
import { isEmpty } from 'react-redux-firebase'
import classes from './OrderCard.scss'
import UpdateIcon from '@material-ui/icons/Update'
import CheckIcon from '@material-ui/icons/send'
import CloseIcon from '@material-ui/icons/close'
import WaitIcon from '@material-ui/icons/schedule'

class OrderCard extends Component {
  state = {
    showConfirm: false
  }

  handleChange = () => {
    this.setState({ showConfirm: !this.state.showConfirm })
  }
  renderIcon = state => {
    switch (state) {
      case 'Generada':
        return <UpdateIcon className={classes.icon} />
      case 'Despachada':
        return <CheckIcon className={classes.icon} />
      case 'Cancelada':
        return <CloseIcon className={classes.icon} />
      case 'Por Cancelar':
        return <WaitIcon className={classes.icon} />
    }
  }
  onConfirm = () => {
    const { onClick } = this.props
    onClick()
    this.handleChange()
  }
  renderConfirm = textModal => (
    <Confirm
      open={this.state.showConfirm}
      message={textModal}
      onCancel={this.handleChange}
      onConfirm={this.onConfirm}
    />
  )
  render() {
    const { order, title, textModal } = this.props
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}> {title}</div>
          <div onClick={this.handleChange}>{this.renderIcon(order.estado)}</div>
        </div>
        <Card className={classes.orderCard}>
          <div className={classes.products}>
            {!isEmpty(order.productos) &&
              order.productos.map((product, index) => (
                <div key={`orderCard-${index}`} className={classes.product}>
                  <div className={classes.productName}>
                    {product.nombreProducto}
                  </div>
                  <div className={classes.productCount}>{product.cantidad}</div>
                </div>
              ))}
          </div>
        </Card>
        {this.renderConfirm(textModal)}
      </div>
    )
  }
}

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  onClick: PropTypes.object,
  textModal: PropTypes.string
}

export default OrderCard
