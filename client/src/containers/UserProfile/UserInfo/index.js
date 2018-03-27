import { connect } from 'react-redux'
import UserInfoComponent from '../../../components/UserProfile/UserInfo'

const UserInfo = connect(state => ({
  viewableUser: state.viewableUser,
}), {})(UserInfoComponent)

export default UserInfo
