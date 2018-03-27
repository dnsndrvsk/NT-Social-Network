import { connect } from 'react-redux'
import UserFriendsComponent from '../../../components/UserPage/UserFriends'

const UserFriends = connect(state => ({
  viewableUser: state.viewableUser
}), {})(UserFriendsComponent)

export default UserFriends
