import { connect } from 'react-redux'
import MessageFormComponent from '../../../components/UserPage/MessageForm'
import { sendMessage } from '../../../actions/messages/sendMessage'

const mapDispatchToProps = dispatch => ({
  dispatch: (friendID, message) => {
    dispatch(sendMessage(friendID, message))
  }
})

const MessageForm = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser
}), mapDispatchToProps)(MessageFormComponent)

export default MessageForm
