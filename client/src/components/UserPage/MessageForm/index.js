import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class MessageForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      open: false,
      message: ''
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  
  onInputChange = (e) => {
    this.setState({ message: e.target.value })  
  }

  sendMessage = () => {
    this.props.dispatch(this.props.viewableUser._id, this.state.message)
    this.setState({ message: '', open: false })
  }

  render() {
    // NB: The actions in this window were passed in as an array of React objects.
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.sendMessage}
      />
    ]

    return (
      <div>
        <RaisedButton
          label="Message"
          primary={true}
          fullWidth={true}
          onClick={this.handleOpen}
        />
        <Dialog
          title="Your message:"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            name="message"
            multiLine={true}
            rows={5}
            rowsMax={10}
            fullWidth={true}
            underlineShow={false}
            onChange={this.onInputChange}
            style={{
              padding: "0 20px",
              border: "1px solid #d3d3d3"
            }}
          />
        </Dialog>
      </div>
    )
  }
}

MessageForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  viewableUser: PropTypes.object.isRequired,
  activeUser: PropTypes.object
}

export default MessageForm
