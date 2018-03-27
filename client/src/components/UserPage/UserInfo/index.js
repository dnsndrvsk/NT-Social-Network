import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import UserStatus from '../../../containers/UserPage/UserStatus'
import { getPassedTime } from '../../../utils/date'
import './UserInfo.scss'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    
    this.state = { isVisible: false }
  }
  
  toggleInfo = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }
  
  render() {
    const user = this.props.viewableUser
    
    return (
      <div className="user-info">
        <Paper
          zDepth={1}
          style={{padding: "10px 20px 30px"}} 
        >
          <h2>
            {user.name} {user.secondName}
          </h2>
          <div style={{marginBottom: '30px'}}>
            <UserStatus />
          </div>
          <div>
            <FlatButton 
              label={this.state.isVisible ? 'Hide info' : 'Show info'}
              primary={true}
              fullWidth={true}
              onClick={this.toggleInfo}
            />
          </div>
          <div style={this.state.isVisible ? {marginTop: '30px'} : {display: 'none'}}>
            <div className="row user-info__text">
              <div className="col s4">
                <span>Birthday</span>
              </div>
              <div className="col s8">
                {user.birthDate}
              </div>
            </div>
            <div className="row user-info__text">
              <div className="col s4">
                <span>Age</span>
              </div>
              <div className="col s8">
                {user.age}
              </div>
            </div>
            <div className="row user-info__text">
              <div className="col s4">
                <span>Origin</span>
              </div>
              <div className="col s8">
                {user.origin}
              </div>
            </div>
            <div className="row user-info__text">
              <div className="col s4">
                <span>Email</span>
              </div>
              <div className="col s8">
                {user.email}
              </div>
            </div>
          </div>
          <div
            className="user-info__online-mark"
            style={user.online.currently ? {color: '#9bcc9b'} : {color: '#d3d3d3 '}} 
          >
            {user.online.currently ? 'Online' : `Last seen ${getPassedTime(user.online.lastOnline)}`}
          </div>
        </Paper>
      </div>
    )
  }
}

UserInfo.propTypes = {
  viewableUser: PropTypes.object.isRequired
}

export default UserInfo
