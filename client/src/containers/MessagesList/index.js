import { connect } from 'react-redux'
import MessagesListComponent from '../../components/MessagesPage/MessagesList'

const MessagesList  = connect(state => ({
  activeUser: state.activeUser
}), {})(MessagesListComponent)

export default MessagesList
