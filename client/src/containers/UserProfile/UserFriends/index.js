import { connect } from 'react-redux'
import UserFriendsComponent from '../../../components/UserProfile/UserFriends'

const UserFriends = connect(state => ({
  viewableUser: state.viewableUser
}), {})(UserFriendsComponent)

export default UserFriends
