import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import FriendRequestIcon from 'material-ui/svg-icons/social/people'
import './FriendRequests.scss'

class FriendRequests extends Component {
  constructor(props) {
    super(props)
    
    this.state = { isOpen: false }
  }
  
  toggleNotifList = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  
  acceptRequest = (friendID) => {
    this.props.acceptRequest(friendID)
  }
  
  deleteRequest = (friendID) => {
    this.props.deleteRequest(friendID)
  }
  
  render() {
    const requests = this.props.activeUser.requests
    
    return (
      <div className="request-notif">
        <div className="request-notif__wrap-inner">
          <Badge
            badgeContent={requests.length}
            secondary={true}
            badgeStyle={
              requests.length >= 1
              ? {top: -2, right: 28}
              : {top: -2, right: 28, display: "none"}
            }
            style={{padding: 0}}
            onClick={this.toggleNotifList}
          >
            <IconButton tooltip="Friend requests">
              <FriendRequestIcon color="#fff" />
            </IconButton>
          </Badge>
          {
            this.state.isOpen
            ? <div className="request-notif__items">
                <Paper zDepth={1}>
                  <List style={{padding: "0"}}>
                    <Subheader>
                      {
                        requests.length >= 1
                        ? 'New Friend Requests'
                        : 'Sorry, there are no requests yet'
                      }
                    </Subheader>
                    {requests.map((request, i) => {
                      return (
                        <ListItem
                          key={i}
                          leftAvatar={
                            <Link to={`/userpage/${request._id}`}>
                              <Avatar src={request.avatar} />
                            </Link>
                          }
                          hoverColor="transparent"
                          disableTouchRipple={true}
                          style={{cursor: "default"}}
                          rightIconButton={
                            <div className="request-notif__btns-wrap">
                              <RaisedButton 
                                label="Accept"
                                primary={true}
                                style={{marginRight: "10px"}}
                                onClick={ () => {this.acceptRequest(request._id)} }
                              />
                              <RaisedButton 
                                label="Remove"
                                secondary={true}
                                onClick={ () => {this.deleteRequest(request._id)} }
                              />
                            </div>
                          }
                        >
                          <Link to={`/userpage/${request._id}`}>
                            {request.name} {request.secondName}
                          </Link>
                        </ListItem>
                      )
                    })}
                  </List>
                </Paper>
              </div>
            : null
          }
        </div>
      </div>
    )
  }
}

FriendRequests.propTypes = {
  acceptRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  activeUser: PropTypes.object.isRequired
}

export default FriendRequests
