import { connect } from 'react-redux'
import { getUserData } from '../../actions/user/getUserData'
import UserProfileComponent from '../../components/UserProfile'

const mapDispatchTpProps = dispatch => ({
  dispatch: (userID) => {
    dispatch(getUserData(userID))
  }
})

const UserProfile = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser,
  isLoading: state.isLoading,
  isFriend: state.additionalInfo.isFriend
}), mapDispatchTpProps)(UserProfileComponent)

export default UserProfile
