import { connect } from 'react-redux'
import { login } from '../../actions/auth/login'
import LoginFormComponent from '../../components/LoginPage/LoginForm'

const mapDispatchToProps = dispatch => ({
  dispatch: (formData, history) => {
    dispatch(login(formData, history))
  }
})

const LoginForm = connect(state => ({
  isLoading: state.isLoading,
  wrongUsername: state.loginForm.wrongUsername,
  wrongPassword: state.loginForm.wrongPassword
}), mapDispatchToProps)(LoginFormComponent)

export default LoginForm
