import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import classes from './usersPage.scss'
import DeleteIcon from '@material-ui/icons/delete'
import ContentAddCircle from '@material-ui/icons/AddCircle'

export const usersPage = ({ users }) => (
  <div>
    <table className={classes.tblProducts}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cargo</th>
          <th className={classes.textAlignC}>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {!isEmpty(users) &&
          users.map((user, ind) => (
            <tr>
              <td>{user.username}</td>
              <td>{user.cargo}</td>
              <td className={classes.textAlignC}>
                <DeleteIcon className={classes.deleteIcon} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    <div className={classes.contentIconAdd}>
      <ContentAddCircle className={classes.addIcon} />
    </div>
  </div>
)

usersPage.propTypes = {
  users: PropTypes.object // from enhancer (firestoreConnect + connect)
}

export default usersPage
