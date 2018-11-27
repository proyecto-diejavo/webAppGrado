import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import classes from './usersPage.scss'
import DeleteIcon from '@material-ui/icons/delete'
import ContentAddCircle from '@material-ui/icons/AddCircle'

export const usersPage = ({ users, goToAddUser }) => (
  <div>
    <table className={classes.tblProducts}>
      <thead>
        <tr>
          <th className={classes.textAlignC}>Nombre</th>
          <th className={classes.textAlignC}>Cargo</th>
        </tr>
      </thead>
      <tbody>
        {!isEmpty(users) &&
          users.map((user, ind) => (
            <tr>
              <td className={classes.textAlignC}>{user.username}</td>
              <td className={classes.textAlignC}>{user.cargo}</td>
            </tr>
          ))}
      </tbody>
    </table>
    <div className={classes.contentIconAdd}>
      <ContentAddCircle
        className={classes.addIcon}
        onClick={() => goToAddUser()}
      />
    </div>
  </div>
)

usersPage.propTypes = {
  users: PropTypes.object,
  goToAddUser: PropTypes.function
}

export default usersPage
