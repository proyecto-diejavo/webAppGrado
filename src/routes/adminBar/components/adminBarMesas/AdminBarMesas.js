import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { AddNewButton } from 'components'
import DeleteIcon from '@material-ui/icons/delete'

import classes from './AdminBarMesas.scss'

export const AdminBarMesas = ({ mesa, children, auth, addMesa, deleteMesa }) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div className={classes.container}>
      <div className={classes.addMesas}>
        <div className={classes.leftElement}>
          <AddNewButton
            className={classes.addButton}
            onClick={() => addMesa()}
          />
        </div>
        <div>
          <table className={classes.tblProducts}>
            <thead>
              <tr>
                <th className={classes.CenterText}>N-Mesa</th>
                <th className={classes.CenterText}>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(mesa) &&
                mesa.map((mesas, ind) => (
                  <tr>
                    <td className={classes.CenterText}>{mesas.numero}</td>
                    <td className={classes.CenterText}>
                      <DeleteIcon
                        key={`Mesa-${mesas.id}-${ind}`}
                        className={classes.deleteIcon}
                        onClick={() => deleteMesa(mesas.id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

AdminBarMesas.propTypes = {
  mesa: PropTypes.array, // from enhancer (firestoreConnect + connect)
  children: PropTypes.object,
  auth: PropTypes.object,
  addMesa: PropTypes.func.isRequired,
  deleteMesa: PropTypes.func.isRequired
}

export default AdminBarMesas
