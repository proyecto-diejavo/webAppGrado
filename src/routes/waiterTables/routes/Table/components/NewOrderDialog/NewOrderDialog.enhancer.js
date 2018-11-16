import { reduxForm } from 'redux-form'

export default reduxForm({
  form: 'newOrder',
  onSubmitSuccess: (result, dispatch, props) => props.reset()
})
