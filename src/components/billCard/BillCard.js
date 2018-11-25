import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, Bill } from 'components'
import { isEmpty } from 'react-redux-firebase'
import { MoneyFormat } from 'formaters'
import classNames from 'classnames/bind'
import UpdateIcon from '@material-ui/icons/Update'
import CheckIcon from '@material-ui/icons/check'
import classes from './BillCard.scss'

const cx = classNames.bind(classes)

const renderIcon = state => {
  if (state === 'por cerrar') return <UpdateIcon className={classes.icon} />
  if (state === 'cerrada') return <CheckIcon className={classes.closeIcon} />
}
class BillCard extends Component {
  state = {
    showBillModal: false
  }

  handleChange = () => {
    this.setState({ showBillModal: !this.state.showBillModal })
  }
  closeBill = () => {
    this.props.closeBill()
    this.handleChange()
  }
  render() {
    const { bill, onChangeService } = this.props
    const closed = bill.estado === 'cerrada'
    return (
      !isEmpty(bill.productos) && (
        <Fragment>
          <div onClick={this.handleChange}>
            <Card className={cx('billCard', { closed })}>
              <div className={classes.total}>{MoneyFormat(bill.total)}</div>
              <div className={classes.header}>{renderIcon(bill.estado)}</div>
            </Card>
          </div>
          <Bill
            bill={bill}
            open={this.state.showBillModal}
            onClose={this.handleChange}
            onChangeService={onChangeService}
            onSubmit={this.closeBill}
          />
        </Fragment>
      )
    )
  }
}

BillCard.propTypes = {
  bill: PropTypes.object.isRequired,
  onChangeService: PropTypes.func,
  closeBill: PropTypes.func
}

export default BillCard
