import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import NewJurney from '../newJurney'
import Jurney from '../jurney'
import { AddNewButton } from 'components'
import classes from './journeyPage.scss'

export const journeyPage = ({
  children,
  jurney,
  barra,
  zona,
  mesero,
  bartender,
  auth,
  newDialogOpen,
  newDialogOpen1,
  toggleDialog,
  toggleDialog1,
  addJourney
}) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div>
      <table className={classes.tblProducts}>
        <thead>
          <tr>
            <th className={classes.CenterText}>Fecha - Jornada</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(jurney) &&
            jurney.map((jurneys, ind) => (
              <tr>
                <td
                  className={classes.CenterText}
                  onClick={() => toggleDialog()}>
                  {jurneys.fecha}
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
        data={jurney}
      />
      <AddNewButton onClick={() => toggleDialog1()} />
    </div>
  )

journeyPage.propTypes = {
  children: PropTypes.object,
  auth: PropTypes.object,
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
