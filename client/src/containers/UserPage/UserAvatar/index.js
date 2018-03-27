import { connect } from 'react-redux'
import { setAvatar } from '../../../actions/profile/avatar/setAvatar'
import UserAvatarComponent from '../../../components/UserPage/UserAvatar'

const mapDispatchTpProps = dispatch => ({
  dispatch: (avatar) => {
    dispatch(setAvatar(avatar))
  }
})

const UserAvatar = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser
}), mapDispatchTpProps)(UserAvatarComponent)

export default UserAvatar
