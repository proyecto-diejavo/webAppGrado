import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Confirm } from 'components'
import { isEmpty } from 'react-redux-firebase'
import classNames from 'classnames/bind'
import UpdateIcon from '@material-ui/icons/Update'
import CheckIcon from '@material-ui/icons/send'
import CloseIcon from '@material-ui/icons/close'
import WaitIcon from '@material-ui/icons/schedule'
import classes from './OrderCard.scss'

const cx = classNames.bind(classes)

class OrderCard extends Component {
  state = {
    showConfirm: false
  }

  handleChange = () => {
    this.setState({ showConfirm: !this.state.showConfirm })
  }
  renderIcon = state => {
    switch (state) {
      case 'generada':
        return <CheckIcon className={classes.icon} />
      case 'cancelada':
        return <CloseIcon className={classes.icon} />
      case 'por cancelar':
        return <UpdateIcon className={classes.icon} />
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
    const closed = order.estado === 'despachada'
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={cx('title', { closed })}> {title}</div>
          <div onClick={this.handleChange}>{this.renderIcon(order.estado)}</div>
        </div>
        <Card className={cx('orderCard', { closed })}>
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
