import { connect } from 'react-redux'
import AvatarPreviewComponent from '../../../../components/UserPage/UserAvatar/AvatarPreview'

const AvatarPreview = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser
}), {})(AvatarPreviewComponent)

export default AvatarPreview
