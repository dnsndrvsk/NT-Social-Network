import { connect } from 'react-redux'
import MessageNotificationsComponent from '../../../../components/Navigation/Userbar/MessageNotifications'

const MessageNotifications = connect(state => ({
  activeUser: state.activeUser
}), {})(MessageNotificationsComponent)

export default MessageNotifications
