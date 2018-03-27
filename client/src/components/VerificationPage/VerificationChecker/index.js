import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import MailImage from 'material-ui/svg-icons/content/mail'
import LinearProgress from 'material-ui/LinearProgress'

class VerificationChecker extends Component {
  
  componentDidMount() {
    this.checkVerification()
    this.timerID = setInterval(this.checkVerification, 3000)
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  
  checkVerification = () => {
    this.props.dispatch(this.props.history)
  }
  
  render() {
    const mailImageStyle = {
      height: "100px",
      width: "100px",
      color: "lightgrey"
    }
    
    return (
      <Card zDepth={1}>
        <LinearProgress mode="indeterminate" color="#ffff00" />
        <CardTitle title="Email Verification" />
        <CardText>
          We've sent you a confirmation email to your email address.
        </CardText>
        <MailImage style={mailImageStyle} />
        <CardText>
          Waiting for verification...
        </CardText>
      </Card>
    )
  }
}


VerificationChecker.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default withRouter(VerificationChecker)
