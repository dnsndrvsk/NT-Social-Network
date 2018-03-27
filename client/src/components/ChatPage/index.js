import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Paper from 'material-ui/Paper'
import PageLayout from '../../layouts/PageLayout'
import SpinnerPage from '../SpinnerPage'
import WithRouterNotLogged from '../../containers/WithRouter/WithRouterNotLogged'
import InputComponent from '../InputComponent'
import CommentList from '../CommentList'
import './ChatPage.scss'


class ChatPage extends Component {
  
  componentDidMount() {
    this.getUserMessages()
    this.updateTimerID = setInterval(this.updateUserMessages, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.updateTimerID)
  }
  
  getUserMessages = () => {
    const friendID = this.props.match.params.id
    this.props.getUserMessages(friendID)
  }
  
  updateUserMessages = () => {
    const friendID = this.props.match.params.id
    this.props.updateUserMessages(friendID)
  }
  
  sendMessage = (message) => {
    const friendID = this.props.match.params.id
    this.props.sendMessage(friendID, message)
  }
  
  deleteMessage = (messageID) => {
    const friendID = this.props.match.params.id
    this.props.deleteMessage(friendID, messageID)
  }
  
  render() {
    
    const { isLoading, userMessages } = this.props
    const isLogged = this.props.activeUser && this.props.activeUser._id
    
    return (
      <WithRouterNotLogged>
        {
          isLoading
            ? <SpinnerPage />
            : <PageLayout>
                <div className="chat-page">
                  <Helmet>
                    <title>NT SN | Chat</title>
                  </Helmet>
                  <div className="col l8 pull-l2 push-l2 s12">
                    <div className="chat-page__wrap-inner">
                      <Paper zDepth={1}>
                        {
                          userMessages.length >= 1
                            ? <CommentList
                                comments={userMessages}
                                isDeletable={isLogged && true}
                                onDelete={this.deleteMessage}
                                label="Show previous..."
                                reversed={true}
                              />
                            : null
                        }
                        <div className="chat-page__message-wrap">
                          <InputComponent
                            onSubmit={this.sendMessage}
                            hintText="Write a message..."
                            btnLabel="Send"
                          />
                        </div>
                      </Paper>
                    </div>
                  </div>
                </div>
              </PageLayout>
        }
      </WithRouterNotLogged>
    )
  }
}

ChatPage.propTypes = {
  getUserMessages: PropTypes.func.isRequired,
  updateUserMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  activeUser: PropTypes.object,
  userMessages: PropTypes.array.isRequired
}

export default ChatPage
