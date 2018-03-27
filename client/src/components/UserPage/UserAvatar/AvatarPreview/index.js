import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SpinnerComponent from '../../../SpinnerComponent'
import LikeComponent from '../../../../containers/UserPage/UserAvatar/AvatarPreview/LikeComponent'
import './AvatarPreview.scss'

class AvatarPreview extends Component {
  
  componentDidMount() {
    //fixes bug with dialog component
    //it appeared at the bottom of the screen
//    setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 0)
  }
  
  render() {
    const isUserLogged = this.props.activeUser
    const user = this.props.viewableUser
    
    return (
      <div className="avatar-preview">
        {
          user
            ? <div className="row">
                <div className="col s6 push-s3 pull-s3">
                  <img
                    className="avatar-preview__image"
                    src={user.avatar}
                    alt={user.name}
                  />
                  {
                    isUserLogged
                      ? <LikeComponent />
                      : null
                  }
                </div>
                <a
                  className="avatar-preview__link"
                  href={user.avatar}
                  target="/blank"
                >
                  View Original
                </a>
              </div>
            : <SpinnerComponent size={90} thickness={7} />
        }
      </div>
    )
  }
}

AvatarPreview.propTypes = {
  viewableUser: PropTypes.object.isRequired,
  activeUser: PropTypes.object
}

export default AvatarPreview
