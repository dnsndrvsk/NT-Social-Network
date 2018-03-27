import { connect } from 'react-redux'
import UserAvatarComponent from '../../../../components/Navigation/Userbar/UserAvatar'

const UserAvatar = connect(state => ({
  activeUser: state.activeUser
}), {})(UserAvatarComponent)

export default UserAvatar
