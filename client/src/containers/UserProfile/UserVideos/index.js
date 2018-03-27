import { connect } from 'react-redux'
import UserVideosComponent from '../../../components/UserProfile/UserVideos'

const UserVideos = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser
}), {})(UserVideosComponent)

export default UserVideos
