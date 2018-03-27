import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import MessageIcon from 'material-ui/svg-icons/communication/forum'
import ReplyIcon from 'material-ui/svg-icons/content/reply'
import './MessageNotifications.scss'


class MessageNotifications extends Component {
  constructor(props) {
    super(props)
    
    this.state = { isOpen: false }
  }
  
  toggleMessageList = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  
  render() {
    const messages = this.props.activeUser.newmessages
    
    return (
      <div className="messages-notif">
        <div className="messages-notif__wrap-inner">
          <Badge
            badgeContent={messages.length}
            secondary={true}
            badgeStyle={
              messages.length >= 1
              ? {top: -2, right: 28}
              : {top: -2, right: 28, display: "none"}
            }
            style={{padding: 0}}
            onClick={this.toggleMessageList}
          >
            <IconButton tooltip="Messages">
              <MessageIcon color="#fff" />
            </IconButton>
          </Badge>
          {
            this.state.isOpen
            ? <div className="messages-notif__items">
                <Paper zDepth={1}>
                  <List style={{padding: "0"}}>
                    <Subheader>
                      {
                        messages.length >= 1
                        ? 'New Messages'
                        : 'Sorry, there are no messages yet'
                      }
                    </Subheader>
                    {messages.map((message, i) => {
                      return (
                        <Link
                          key={i}
                          to={`/chatroom/${message.user._id}`}
                          onClick={this.toggleMessageList}
                        >
                          <ListItem
                            primaryText={message.user.name}
                            secondaryText={message.message}
                            leftAvatar={<Avatar src={message.user.avatar} />}
                            rightIcon={<ReplyIcon />}
                          />
                        </Link>
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

MessageNotifications.propTypes = {
  activeUser: PropTypes.object.isRequired
}

export default MessageNotifications
