import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import RoundAvatar from '../../RoundAvatar'
import ForwardImage from 'material-ui/svg-icons/content/forward'
import SentimentalImage from 'material-ui/svg-icons/social/sentiment-neutral'
import './MessagesList.scss'

const imageStyle = {
  height: "200px",
  width: "200px",
  color: "lightgrey"
}


const MessagesList = (props) => {
  const messages = props.activeUser && props.activeUser.messages
  
  return (
    <div className="messages-list">
      {
        messages && props.activeUser.messages.length >= 1
          ? <Paper zDepth={1}>
              <List>
                {props.activeUser.messages.map((message, i) => {
                  return (
                    <Link
                      key={i}
                      to={`/chatroom/${message.receiver._id}`}
                    >
                      <ListItem
                        primaryText={message.receiver.name}
                        leftAvatar={
                          <div>
                            <RoundAvatar user={message.receiver} />
                          </div>
                        }
                        rightIcon={ <ForwardImage /> }
                      />
                    </Link>
                  )
                })}
              </List>
            </Paper>
          : <Paper zDepth={1}>
              <div className="messages-list__empty-wrap">
                <SentimentalImage style={imageStyle} />
                <p>Oops! It seems that you haven't written to anyone yet</p>
                <Link to="/friends">
                  <p>Go and find your friends!</p>
                </Link>
              </div>
            </Paper>
      }
    </div>
  )
}

MessagesList.propTypes = {
  activeUser: PropTypes.object
}

export default MessagesList
