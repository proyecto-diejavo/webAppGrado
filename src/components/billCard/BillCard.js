import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, Bill } from 'components'
import { isEmpty } from 'react-redux-firebase'
import { MoneyFormat } from 'formaters'
import classes from './BillCard.scss'
import UpdateIcon from '@material-ui/icons/Update'
import CheckIcon from '@material-ui/icons/check'

const renderIcon = state => {
  if (state === 'Abierta') return <UpdateIcon className={classes.icon} />
  if (state === 'Cerrada') return <CheckIcon className={classes.icon} />
}
class BillCard extends Component {
  state = {
    showBillModal: false
  }

  handleChange = () => {
    this.setState({ showBillModal: !this.state.showBillModal })
  }

  render() {
    const { bill } = this.props
    return (
      !isEmpty(bill.productos) && (
        <Fragment>
          <div onClick={this.handleChange}>
            <Card className={classes.billCard}>
              <div className={classes.total}>{MoneyFormat(bill.total)}</div>
              <div className={classes.header}>{renderIcon(bill.estado)}</div>
            </Card>
          </div>
          <Bill
            bill={bill}
            open={this.state.showBillModal}
            onClose={this.handleChange}
          />
        </Fragment>
      )
    )
  }
}

BillCard.propTypes = {
  bill: PropTypes.object.isRequired
}

export default BillCard
