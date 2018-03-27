import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import SpinnerComponent from '../../SpinnerComponent'
import './LoginForm.scss'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      username: '',
      password: '',
      showWrongFields: false
    }
  }
  
  sendLoginData = () => {
    this.props.dispatch(this.state, this.props.history)
  }
  
  onSubmit = () => {
    const isFormValid = this.validateForm()
    
    isFormValid
      ? this.sendLoginData()
      : this.setState({ showWrongFields: true })
  }
  
  validateForm = () => {
    if (!this.state.username || !this.state.password) {
      return false
    }
    return true
  }
  
  onInputFieldChange = (e) => {
    if (e.target.name === 'username') {
      this.setState({ username: e.target.value })
    }
    if (e.target.name === 'password') {
      this.setState({ password: e.target.value })
    }
  }
  
  render() {
    return (
      <div>
        {
          this.props.isLoading
            ? <SpinnerComponent size={120} thickness={10} />
            : <Paper className="login-form" zDepth={1}>
                <div className="login-form__fields-wrap">
                  <TextField
                    floatingLabelText="Username"
                    name="username"
                    value={this.state.username}
                    errorText={
                      (this.props.wrongUsername && 'Wrong username') ||
                      (this.state.showWrongFields && !this.state.username
                      && 'This field is required')
                    }
                    onChange={this.onInputFieldChange}
                    fullWidth={true}
                  />
                  <TextField
                    floatingLabelText="Password"
                    name="password"
                    value={this.state.password}
                    errorText={
                      (this.props.wrongPassword && 'Wrong password') ||
                      (this.state.showWrongFields && !this.state.password
                      && 'This field is required')
                    }
                    type="password"
                    fullWidth={true}
                    onChange={this.onInputFieldChange}
                  />
                </div>
                <RaisedButton 
                  label="Continue"
                  primary={true}
                  onClick={this.onSubmit}
                />
              </Paper>
        }
      </div>
    )
  }
}


LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  wrongUsername: PropTypes.bool,
  wrongPassword: PropTypes.bool
}

export default withRouter(LoginForm)
