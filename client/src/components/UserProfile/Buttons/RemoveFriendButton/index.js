import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

class RemoveFriendButton extends Component {
  
  removeFriend = () => {
    this.props.dispatch(this.props.viewableUser._id)
  }
  
  render() {
    return (
      <div>
        <RaisedButton
          label="Unfriend"
          fullWidth={true}
          secondary={true}
          onClick={this.removeFriend}
        />
      </div>
    )
  }
}

RemoveFriendButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  viewableUser: PropTypes.object.isRequired,
  activeUser: PropTypes.object,
}

export default RemoveFriendButton
