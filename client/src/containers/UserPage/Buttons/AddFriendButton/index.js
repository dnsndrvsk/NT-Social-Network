import { connect } from 'react-redux'
import { sendFriendRequest } from '../../../../actions/requests/sendFriendRequest'
import AddFriendButtonComponent from '../../../../components/UserPage/Buttons/AddFriendButton'

const mapDispatchTpProps = dispatch => ({
  dispatch: (friendID) => {
    dispatch(sendFriendRequest(friendID))
  }
})

const AddFriendButton = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser,
  wasRequestSent: state.additionalInfo.wasRequestSent
}), mapDispatchTpProps)(AddFriendButtonComponent)

export default AddFriendButton
