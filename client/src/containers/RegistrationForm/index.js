import { connect } from 'react-redux'
import RegistrationFormComponent from '../../components/RegistrationPage/RegistrationForm'
import { register } from '../../actions/auth/register'

const mapDispatchToProps = dispatch => ({
  dispatch: (formData, history) => {
    dispatch(register(formData, history))
  }
})

const RegistrationForm = connect(state => ({
  isLoading: state.isLoading,
  usernameIsTaken: state.registrationForm.usernameIsTaken
}), mapDispatchToProps)(RegistrationFormComponent)

export default RegistrationForm
