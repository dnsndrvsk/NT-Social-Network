import { connect } from 'react-redux'
import FriendRequestsComponent from '../../../../components/Navigation/Userbar/FriendRequests'
import { acceptRequest } from '../../../../actions/requests/acceptRequest'
import { deleteRequest } from '../../../../actions/requests/deleteRequest'

const mapDispatchToProps = dispatch => ({
  acceptRequest: (friendID) => {
    dispatch(acceptRequest(friendID))
  },
  deleteRequest: (friendID) => {
    dispatch(deleteRequest(friendID))
  }
})

const FriendRequests = connect(state => ({
  activeUser: state.activeUser
}), mapDispatchToProps)(FriendRequestsComponent)

export default FriendRequests
