import { connect } from 'react-redux'
import UserStatusComponent from '../../../components/UserPage/UserStatus'
import { setStatus } from '../../../actions/profile/status/setStatus'

const mapDispatchToProps = dispatch => ({
  dispatch: (status) => {
    dispatch(setStatus(status))
  }
})

const UserStatus = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser
}), mapDispatchToProps)(UserStatusComponent)

export default UserStatus
