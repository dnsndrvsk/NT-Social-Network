import { connect } from 'react-redux'
import AvatarPreviewComponent from '../../../../components/UserProfile/UserAvatar/AvatarPreview'

const AvatarPreview = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser
}), {})(AvatarPreviewComponent)

export default AvatarPreview
