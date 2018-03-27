import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FriendRequests from '../../../containers/Navigation/Userbar/FriendRequests'
import MessageNotifications from '../../../containers/Navigation/Userbar/MessageNotifications'
import UserAvatar from '../../../containers/Navigation/Userbar/UserAvatar'
import Logout from '../../../containers/Navigation/Userbar/Logout'
import Join from './Join'
import './Userbar.scss'

class Userbar extends Component {
  
  componentDidMount() {
    this.updateUserData()
    this.updateTimerID = setInterval(this.updateUserData, 2000)
  }
  
  componentWillUnmount() {
    clearInterval(this.updateTimerID)
  }
  
  updateUserData = () => {
    this.props.dispatch()
  }
  
  render() {
    return (
      <div className="user-bar">
        {
          this.props.activeUser
          ? <div>
              <div className="user-bar__item">
                <MessageNotifications />
              </div>
              <div className="user-bar__item">
                <FriendRequests />
              </div>
              <div className="user-bar__item">
                <Logout />
              </div>
              <div className="user-bar__item">
                <UserAvatar />
              </div>
            </div>
          : <Join />
        }
      </div>
    )
  }
}

Userbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  activeUser: PropTypes.object
}

export default Userbar
