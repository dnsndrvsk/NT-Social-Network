import { connect } from 'react-redux'
import UserWallComponent from '../../../components/UserPage/UserWall'
import { leaveWallComment } from '../../../actions/wallcomments/leaveWallComment'
import { deleteWallComment } from '../../../actions/wallcomments/deleteWallComment'

const mapDispatchToProps = dispatch => ({
  leaveComment: (comment, friendID) => {
    dispatch(leaveWallComment(comment, friendID))
  },
  deleteComment: (commentID) => {
    dispatch(deleteWallComment(commentID))
  }
})

const UserWall = connect(state => ({
  viewableUser: state.viewableUser,
  activeUser: state.activeUser,
  isFriend: state.additionalInfo.isFriend
}), mapDispatchToProps)(UserWallComponent)

export default UserWall
