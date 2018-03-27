import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

class AddFriendButton extends Component {
  
  sendFriendRequest = () => {
    this.props.dispatch(this.props.viewableUser._id)
  }
  
  render() {
    return (
      <div>
        {
          this.props.wasRequestSent
            ? <RaisedButton
                label="Request Sent"
                fullWidth={true}
                disabled={true}
                disabledBackgroundColor="#F06292"
                disabledLabelColor="#fff"
              />
            : <RaisedButton
                label="Send request"
                secondary={true}
                fullWidth={true}
                onClick={this.sendFriendRequest}
              />
        }
      </div>
    )
  }
}

AddFriendButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  viewableUser: PropTypes.object.isRequired,
  activeUser: PropTypes.object,
  wasRequestSent: PropTypes.bool
}

export default AddFriendButton
