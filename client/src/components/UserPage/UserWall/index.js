import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import WallImage from 'material-ui/svg-icons/action/assignment'
import InputComponent from '../../InputComponent'
import CommentList from '../../CommentList'
import './UserWall.scss'


class UserWall extends Component {
  
  sendComment = (comment) => {
    this.props.leaveComment(comment, this.props.viewableUser._id)
  }
  
  deleteComment = (commentID) => {
    this.props.deleteComment(commentID)
  }
  
  render() {
    const comments = this.props.viewableUser.wallcomments
    const isOwnPage = this.props.activeUser && (this.props.activeUser._id === this.props.viewableUser._id)
    
    const wallImageStyle = {
      height: "80px",
      width: "80px",
      color: "lightgrey"
    }
    
    return (
      <div className='user-wall'>
        <Paper zDepth={1}>
          {
            isOwnPage || this.props.isFriend
              ? <div className="user-wall__wrap-inner">
                  <InputComponent
                    onSubmit={this.sendComment}
                    hintText="Add a comment..."
                    btnLabel="Add"
                  />
                </div>
              : null
          }
          {
            comments.length >= 1
              ? <CommentList
                  comments={comments}
                  isDeletable={isOwnPage}
                  onDelete={this.deleteComment}
                  label="Show more..."
                  reversed={false}
                />
              : <div className="user-wall__empty">
                  <WallImage style={wallImageStyle} />
                  <p>There are no comments yet</p>
                </div>
          }
        </Paper>
      </div>
    )
  }
}

UserWall.propTypes = {
  leaveComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  viewableUser: PropTypes.object.isRequired,
  activeUser: PropTypes.object,
  isFriend: PropTypes.bool
}

export default UserWall
