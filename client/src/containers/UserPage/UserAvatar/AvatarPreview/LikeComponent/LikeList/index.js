import { connect } from 'react-redux'
import LikeListComp from '../../../../../../components/UserPage/UserAvatar/AvatarPreview/LikeComponent/LikeList'

const LikeList = connect(state => ({
  viewableUser: state.viewableUser
}), {})(LikeListComp)

export default LikeList
