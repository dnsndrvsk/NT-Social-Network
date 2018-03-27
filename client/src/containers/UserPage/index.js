import { connect } from 'react-redux'
import { getUserData } from '../../actions/user/getUserData'
import UserPageComponent from '../../components/UserPage'

const mapDispatchTpProps = dispatch => ({
  dispatch: (userID) => {
    dispatch(getUserData(userID))
  }
})

const UserPage = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser,
  isLoading: state.isLoading,
  isFriend: state.additionalInfo.isFriend
}), mapDispatchTpProps)(UserPageComponent)

export default UserPage
