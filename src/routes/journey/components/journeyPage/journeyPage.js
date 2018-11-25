import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import NewJurney from '../newJurney'
import classes from './journeyPage.scss'

export const journeyPage = ({
  children,
  jurney,
  auth,
  newDialogOpen,
  toggleDialog,
  addProject
}) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div>
      <table className={classes.tblProducts}>
        <thead>
          <tr>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(jurney) &&
            jurney.map((jurneys, ind) => (
              <tr>
                <td
                  className={classes.CenterText}
                  onClick={() => toggleDialog()}>
                  {Date(jurneys.fecha)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <NewJurney
        onSubmit={addProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
        data={jurney}
      />
    </div>
  )

journeyPage.propTypes = {
  children: PropTypes.object, // from react-router
  auth: PropTypes.object,
  jurney: PropTypes.object, // from enhancer (firestoreConnect + connect)
  newDialogOpen: PropTypes.bool, // from enhancer (withStateHandlers)
  toggleDialog: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired
}

export default journeyPage
