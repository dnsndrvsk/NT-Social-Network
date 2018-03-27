import { connect } from 'react-redux'
import LikeListComp from '../../../../../../components/UserProfile/UserAvatar/AvatarPreview/LikeComponent/LikeList'

const LikeList = connect(state => ({
  viewableUser: state.viewableUser
}), {})(LikeListComp)

export default LikeList
