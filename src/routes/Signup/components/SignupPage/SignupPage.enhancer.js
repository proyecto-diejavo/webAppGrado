import { withFirebase } from 'react-redux-firebase'
import { withHandlers, pure, compose } from 'recompose'
// import { UserIsNotAuthenticated } from 'utils/router'
import { withNotifications } from 'modules/notification'

export default compose(
  // UserIsNotAuthenticated, // redirect to list page if logged in
  withNotifications, // add props.showError
  withFirebase, // add props.firebase (firebaseConnect() can also be used)
  // Handlers
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    emailSignup: ({ firebase, showError }) => creds =>
      firebase
        .createUser(creds, {
          ...creds
        })
        .catch(err => showError(err.message))
  }),
  pure // shallow equals comparison on props (prevent unessesary re-renders)
)
