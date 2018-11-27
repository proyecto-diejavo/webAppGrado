import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import NewJurney from '../newJurney'
import Jurney from '../jurney'
import { AddNewButton } from 'components'
import classes from './journeyPage.scss'

class journeyPage extends Component {
  state = {
    journey: {}
  }
  onSelectJourney = journey => {
    this.setState({ journey })
    this.props.toggleDialog()
  }
  render() {
    const {
      jurney,
      barra,
      zona,
      mesero,
      bartender,
      newDialogOpen,
      newDialogOpen1,
      toggleDialog,
      toggleDialog1,
      addJourney
    } = this.props
    return (
      <div>
        <table className={classes.tblProducts}>
          <thead>
            <tr>
              <th className={classes.CenterText}>Fecha - Jornada</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(jurney) &&
              jurney.map((obj, ind) => (
                <tr>
                  <td
                    className={classes.CenterText}
                    onClick={() => this.onSelectJourney(obj)}>
                    {obj.fecha}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <NewJurney
          onSubmit={addJourney}
          open={newDialogOpen1}
          onRequestClose={toggleDialog1}
          barra={barra}
          mesero={mesero}
          bartender={bartender}
          zona={zona}
        />
        <Jurney
          open={newDialogOpen}
          onRequestClose={toggleDialog}
          data={this.state.journey}
        />
        <AddNewButton onClick={() => toggleDialog1()} />
      </div>
    )
  }
}

journeyPage.propTypes = {
  jurney: PropTypes.object,
  mesero: PropTypes.object,
  zona: PropTypes.object,
  bartender: PropTypes.object,
  barra: PropTypes.object,
  newDialogOpen: PropTypes.bool,
  newDialogOpen1: PropTypes.bool,
  toggleDialog: PropTypes.func.isRequired,
  toggleDialog1: PropTypes.func.isRequired,
  addJourney: PropTypes.func.isRequired
}

export default journeyPage
