import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import areIntlLocalesSupported from 'intl-locales-supported'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import SpinnerComponent from '../../SpinnerComponent'
import { validateName, validateEmail, validatePassword } from '../../../utils/formValidation'
import defaultAvatar from '../../../assets/default_user.jpg'
import './RegistrationForm.scss'


let DateTimeFormat
/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['en', 'en-US'])) {
  DateTimeFormat = global.Intl.DateTimeFormat
} else {
  const IntlPolyfill = require('intl')
  DateTimeFormat = IntlPolyfill.DateTimeFormat
  require('intl/locale-data/jsonp/en')
  require('intl/locale-data/jsonp/en-US')
}

class RegistrationForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      username: '',
      name: '',
      secondName: '',
      birthDate: '',
      age: '',
      email: '',
      password: '',
      repeatedPassword: '',
      origin: 'Human',
      status: 'Hi!',
      avatar: defaultAvatar,
      isDialogOpen: false,
      isNotRobot: false,
      tooShortUsername: false,
      wrongName: false,
      wrongSecondName: false,
      wrongPassword: false,
      wrongRepeatedPassword: false,
      wrongEmail: false,
      wrongBirthDate: false
    }
  }
  
  onSubmit = () => {
    const isFormValid = this.validateForm()
    
    if (isFormValid) {
      this.state.isNotRobot
        ? this.sendRegisterData()
        : this.setState({ isDialogOpen: true })
    }
  }
  
  validateForm = () => {
    let fields = {
      tooShortUsername:      false,
      wrongName:             false,
      wrongSecondName:       false,
      wrongPassword:         false,
      wrongRepeatedPassword: false,
      wrongEmail:            false,
      wrongBirthDate:        false
    }
    
    const isValidName = validateName(this.state.name)
    const isValidSecondName = validateName(this.state.secondName)
    const isValidEmail = validateEmail(this.state.email)
    const isValidPassword = validatePassword(this.state.password)
    
    if (this.state.username.length < 3) {
      fields.tooShortUsername = true
    }
    if (!isValidName) {
      fields.wrongName = true
    }
    if (!isValidSecondName) {
      fields.wrongSecondName = true
    }
    if (this.state.password !== this.state.repeatedPassword) {
      fields.wrongRepeatedPassword = true
    }
    if (!isValidEmail) {
      fields.wrongEmail = true
    }
    if (!isValidPassword) {
      fields.wrongPassword = true
    }
    if (!this.state.birthDate) {
      fields.wrongBirthDate = true
    }
    
    if (
      fields.tooShortUsername      ||
      fields.wrongName             ||
      fields.wrongSecondName       ||
      fields.wrongPassword         ||
      fields.wrongRepeatedPassword ||
      fields.wrongEmail            ||
      fields.wrongBirthDate
    ) {
      this.showWrongFields(fields)
      return false
    } else {
      this.showWrongFields(fields)
      return true
    }
  }
  
  showWrongFields = (fields) => {
    this.setState({
      tooShortUsername:      fields.tooShortUsername,
      wrongName:             fields.wrongName,
      wrongSecondName:       fields.wrongSecondName,
      wrongPassword:         fields.wrongPassword,
      wrongRepeatedPassword: fields.wrongRepeatedPassword,
      wrongEmail:            fields.wrongEmail,
      wrongBirthDate:        fields.wrongBirthDate
    })
  }
  
  sendRegisterData = () => {
    this.props.dispatch(this.state, this.props.history)
  }
  
  onInputFieldChange = (e) => {
    if (e.target.name === 'username') {
      this.setState({ username: e.target.value })
    }
    if (e.target.name === 'name') {
      this.setState({ name: e.target.value })
    }
    if (e.target.name === 'secondName') {
      this.setState({ secondName: e.target.value })
    }
    if (e.target.name === 'password') {
      this.setState({ password: e.target.value })
    }
    if (e.target.name === 'repeatedPassword') {
      this.setState({ repeatedPassword: e.target.value })
    }
    if (e.target.name === 'email') {
      this.setState({ email: e.target.value })
    }
  }
  
  onBirthDateChange = (e, date) => {
    const fullBirthDate = new DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
    
    const dateNow = new Date()
    const yearNow = dateNow.getFullYear()
    const age = yearNow - +fullBirthDate.split(', ')[1]
    
    this.setState({
      birthDate: fullBirthDate,
      age: age
    })
  }
  
  onOriginChange = (e) => {
    this.setState({ origin: e.target.value })
  }
  
  onIsNotRobotChange = (e, isInputChecked) => {
    this.setState({ isNotRobot: isInputChecked })
  }
  
  handleDialogClose = () => {
    this.setState({ isDialogOpen: false })
  }
  
  render() {
    const inputStyles = {
      radioGroup: {
        marginBottom: '16px'
      },
      radioStyle: {
        textAlign: "left"
      },
      checkboxStyle: {
        textAlign: 'left',
        marginBottom: '10px'
      },
      raisedBtn: {
        margin: '30px 0'
      },
      datePicker: {
        padding: '26px 0'
      }
    }
    
    const dialogActions = [
      <FlatButton
        label="Close"
        secondary={true}
        onClick={this.handleDialogClose}
      />
    ]
    
    return (
      <div>
        {
          this.props.isLoading
            ? <SpinnerComponent size={120} thickness={10} />
            : <Paper zDepth={1}>
                <div className="registration-form">
                  <div>
                    <TextField
                      floatingLabelText="Username"
                      value={this.state.username}
                      fullWidth={true}
                      errorText={
                        this.props.usernameIsTaken
                        ? "This username is already taken"
                        : this.state.tooShortUsername && "This username is too short"
                      }
                      onChange={this.onInputFieldChange}
                      name="username"
                    />
                    <div className="registration-form__two-fields-wrap">
                      <TextField
                        floatingLabelText="Name"
                        value={this.state.name}
                        fullWidth={true}
                        errorText={this.state.wrongName && "Not correct name"}
                        onChange={this.onInputFieldChange}
                        name="name"
                      />
                      <TextField
                        floatingLabelText="Second name"
                        value={this.state.secondName}
                        fullWidth={true}
                        errorText={this.state.wrongSecondName && "Not correct second name"}
                        onChange={this.onInputFieldChange}
                        name="secondName"
                      />
                    </div>
                    <TextField
                      floatingLabelText="Email"
                      value={this.state.email}
                      fullWidth={true}
                      errorText={this.state.wrongEmail && "Not valid email"}
                      onChange={this.onInputFieldChange}
                      name="email"
                    />
                    <div className="registration-form__two-fields-wrap">
                      <TextField
                        floatingLabelText="Password"
                        value={this.state.password}
                        type="password"
                        errorText={this.state.wrongPassword && "Not strong enough"}
                        fullWidth={true}
                        onChange={this.onInputFieldChange}
                        name="password"
                      />
                      <TextField
                        floatingLabelText="Repeat the password"
                        value={this.state.repeatedPassword}
                        type="password"
                        errorText={this.state.wrongRepeatedPassword && "Passwords do not match"}
                        fullWidth={true}
                        onChange={this.onInputFieldChange}
                        name="repeatedPassword"
                      />
                    </div>
                    <DatePicker 
                      hintText="Birth date"
                      fullWidth={true}
                      errorText={this.state.wrongBirthDate && "Please, select your birth date"}
                      onChange={this.onBirthDateChange}
                      maxDate={new Date()}
                      formatDate={
                        new DateTimeFormat('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }).format
                      }
                      style={inputStyles.datePicker}
                    />
                    <RadioButtonGroup
                      name="shipSpeed" 
                      defaultSelected="Human"
                      onChange={this.onOriginChange}
                      style={inputStyles.radioGroup}
                    >
                      <RadioButton
                        value="Human"
                        label="Human"
                        style={inputStyles.radioStyle}
                      />
                      <RadioButton
                        value="Alien"
                        label="Alien"
                        style={inputStyles.radioStyle}
                      />
                    </RadioButtonGroup>
                    <Checkbox 
                      label="I am not a robot"
                      onCheck={this.onIsNotRobotChange}
                      checked={this.state.isNotRobot}
                      style={inputStyles.checkboxStyle}
                    />
                  </div>
                  <RaisedButton 
                    label="Continue"
                    primary={true}
                    onClick={this.onSubmit}
                    style={inputStyles.raisedBtn}
                  />
                </div>
                <Dialog
                  title="Oops!"
                  modal={false}
                  actions={dialogActions}
                  open={this.state.isDialogOpen}
                  onRequestClose={this.handleDialogClose}
                >
                  Probably you forget to put <b>"I am not a robot"</b> mark.
                </Dialog>
              </Paper>
        }
      </div>
    )
  }
}


RegistrationForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  usernameIsTaken: PropTypes.bool
}

export default withRouter(RegistrationForm)
