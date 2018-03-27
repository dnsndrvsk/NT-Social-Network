import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from 'material-ui/List/List'
import FlatButton from 'material-ui/FlatButton'
import Comment from './Comment'

class CommentList extends Component {
  constructor(props) {
    super(props)
    
    this.state = { index: 5 }
  }
  
  componentDidMount() {
    if (this.props.reversed) {
      this.setState({ index: (this.props.comments.length - 1) - 5 })
    } else {
      this.setState({ index: 5 })
    }
  }
  
  onDelete = (commentID) => {
    this.props.onDelete(commentID)
  }
  
  loadMore = () => {
    this.setState({ index: this.state.index + 5 })
  }
  
  loadPrev = () => {
    this.setState({ index: this.state.index - 5 })
  }
  
  render() {
    const { comments, isDeletable } = this.props
    
    return (
      <List>
        <div>
          {
            this.props.reversed && this.props.comments.length > 5
              ? <FlatButton
                  label={this.props.label || 'Show more'}
                  fullWidth={true}
                  onClick={this.loadPrev}
                  disabled={this.state.index < 0}
                />
              : null
          }
        </div>
        <div>
          {comments.map((comment, i) => {
            if (!this.props.reversed) {
              if (i < this.state.index) {
                return (
                  <Comment
                    key={i}
                    data={comment}
                    isDeletable={isDeletable}
                    onDelete={this.onDelete}
                  />
                )
              }
            } else {
              if (i > this.state.index) {
                return (
                  <Comment
                    key={i}
                    data={comment}
                    isDeletable={isDeletable}
                    onDelete={this.onDelete}
                  />
                )
              }
            }
          })}
        </div>
        <div>
          {
            !this.props.reversed && this.props.comments.length > 5
              ? <FlatButton
                  label={this.props.label || 'Show more'}
                  fullWidth={true}
                  onClick={this.loadMore}
                  disabled={this.state.index > comments.length}
                />
              : null
          }
        </div>
      </List>
    )
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  isDeletable: PropTypes.bool,
  reversed: PropTypes.bool,
  label: PropTypes.string
}

export default CommentList
