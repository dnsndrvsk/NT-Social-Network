import { connect } from 'react-redux'
import { removeFriend } from '../../../../actions/friendship/removeFriend'
import RemoveFriendButtonComponent from '../../../../components/UserPage/Buttons/RemoveFriendButton'

const mapDispatchTpProps = dispatch => ({
  dispatch: (friendID) => {
    dispatch(removeFriend(friendID))
  }
})

const RemoveFriendButton = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser,
}), mapDispatchTpProps)(RemoveFriendButtonComponent)

export default RemoveFriendButton
