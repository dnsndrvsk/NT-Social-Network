import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Dialog from 'material-ui/Dialog'
import RoundAvatar from '../../../../RoundAvatar'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import LikeList from '../../../../../containers/UserPage/UserAvatar/AvatarPreview/LikeComponent/LikeList'
import './LikeComponent.scss'

class LikeComponent extends Component {
  constructor(props) {
    super(props)
    
    this.state = { isAllOpen: false }
  }
  
  updateData = () => {
    this.props.dispatch(this.props.viewableUser._id)
  }
  
  toggleShowAll = () => {
    this.setState({ isAllOpen: !this.state.isAllOpen })
  }
  
  render() {
    const avatarlikes = this.props.viewableUser.avatarlikes
    const firstFiveLikes = avatarlikes.slice(0, 5)
    const likesCount = avatarlikes.length
    const restLikes = likesCount > 5 ? likesCount - 5 : 0
    
    const likeContainerStyle = {
      display: "table",
      margin: "0 auto",
      textAlign: "center"
    }
    
    const checkboxStyle = {
      width: "80px",
      height: "80px",
      fill: '#FF4081',
      textAlign: 'left',
      margin: "0"
    }
    
    return (
      <div className="like-comp">
        <div style={likeContainerStyle}>
          <Checkbox
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            disableTouchRipple={true}
            iconStyle={checkboxStyle}
            onCheck={this.updateData}
            checked={this.props.isLiked}
          />
        </div>
        <div className="like-comp__count">
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </div>
        <div>
          {firstFiveLikes.map((user, i) => {
            return (
              <Link
                className="like-comp__avatar"
                to={`/userpage/${user._id}`}
                title={`${user.name} ${user.secondName}`}
                key={i}
              >
                <RoundAvatar user={user} />
              </Link>
            )
          })}
        </div>
        {
          restLikes > 0
            ? <div className="like-comp__rest">
                <FlatButton
                  label={`and ${restLikes} others like this`}
                  onClick={this.toggleShowAll}
                />
              </div>
            : null
        }
        <Dialog
          modal={false}
          open={this.state.isAllOpen}
          onRequestClose={this.toggleShowAll}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          bodyStyle={{minHeight: '300px', maxHeight: '300px'}}
        >
          <LikeList amount={21} />
        </Dialog>
      </div>
    )
  }
}

LikeComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  viewableUser: PropTypes.object.isRequired,
  activeUser: PropTypes.object,
  isLiked: PropTypes.bool
}

export default LikeComponent
