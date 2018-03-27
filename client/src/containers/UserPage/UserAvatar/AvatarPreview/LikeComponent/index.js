import { connect } from 'react-redux'
import { likeAvatar } from '../../../../../actions/likes/avatar/likeAvatar'
import Like from '../../../../../components/UserPage/UserAvatar/AvatarPreview/LikeComponent'

const mapDispatchTpProps = dispatch => ({
  dispatch: (friendID) => {
    dispatch(likeAvatar(friendID))
  }
})

const LikeComponent = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser,
  isLiked: state.additionalInfo.isLiked
}), mapDispatchTpProps)(Like)

export default LikeComponent
