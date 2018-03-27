import { connect } from 'react-redux'
import { getUserMessages } from '../../actions/messages/getUserMessages'
import { updateUserMessages } from '../../actions/messages/updateUserMessages'
import { sendMessage } from '../../actions/messages/sendMessage'
import { deleteMessage } from '../../actions/messages/deleteMessage'
import ChatPageComponent from '../../components/ChatPage'

const mapDispatchToProps = (dispatch => ({
  getUserMessages: (friendID) => {
    dispatch(getUserMessages(friendID))
  },
  updateUserMessages: (friendID) => {
    dispatch(updateUserMessages(friendID))
  },
  sendMessage: (friendID, message) => {
    dispatch(sendMessage(friendID, message))
  },
  deleteMessage: (friendID, messageID) => {
    dispatch(deleteMessage(friendID, messageID))
  }
}))

const ChatPage = connect(state => ({
  activeUser: state.activeUser,
  isLoading: state.isLoading,
  userMessages: state.userMessages
}), mapDispatchToProps)(ChatPageComponent)

export default ChatPage
