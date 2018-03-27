import { connect } from 'react-redux'
import UserVideosComponent from '../../../components/UserPage/UserVideos'

const UserVideos = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser
}), {})(UserVideosComponent)

export default UserVideos
