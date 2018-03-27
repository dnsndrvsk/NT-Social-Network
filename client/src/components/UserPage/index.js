import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import PageLayout from '../../layouts/PageLayout'
import SpinnerPage from '../SpinnerPage'
import UserInfo from '../../containers/UserPage/UserInfo'
import UserAvatar from '../../containers/UserPage/UserAvatar'
import UserWall from '../../containers/UserPage/UserWall'
import UserFriends from '../../containers/UserPage/UserFriends'
import UserVideos from '../../containers/UserPage/UserVideos'
import MessageForm from '../../containers/UserPage/MessageForm'
import AddFriendButton from '../../containers/UserPage/Buttons/AddFriendButton'
import RemoveFriendButton from '../../containers/UserPage/Buttons/RemoveFriendButton'
import './UserPage.scss'

class UserPage extends Component {
  
  componentDidMount() {
    this.getUserData()
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.newProps) {
      this.oldProps = this.newProps
    }
    this.newProps = nextProps
    if (this.oldProps && this.newProps) {
      if (this.newProps.location.pathname !== this.oldProps.location.pathname) {
        this.getUserData()
      }
    }
  }
  
  getUserData = () => {
    if (this.newProps) {
      this.props.dispatch(this.newProps.match.params.id)
    } else {
      this.props.dispatch(this.props.match.params.id)
    }
  }
  
  render() {
    console.log('UserPage rendered...')
    const isUserLogged = this.props.activeUser
    
    return (
      <div>
        {
          this.props.isLoading || !this.props.viewableUser
            ? <SpinnerPage />
            : <PageLayout>
                <div className="user-page">
                  <Helmet>
                    <title>NT SN | Userpage</title>
                  </Helmet>
                  <div className="col l4 m5 s12">
                    <div className="user-page__item">
                      <UserAvatar />
                      {
                        isUserLogged
                          && this.props.activeUser._id !== this.props.viewableUser._id
                              ? this.props.isFriend
                                  ? <div className="user-page__btns">
                                      <MessageForm />
                                      <RemoveFriendButton />
                                    </div>
                                  : <AddFriendButton />
                              : null
                      }
                    </div>
                    <div className="user-page__item">
                      <UserFriends />
                    </div>
                    <div className="user-page__item">
                      <UserFriends showOnline={true} />
                    </div>
                  </div>
                  <div className="col l8 m7 s12">
                    <div className="user-page__item">
                      <UserInfo />
                    </div>
                    <div className="user-page__item">
                      <UserVideos />
                    </div>
                    <div className="user-page__item">
                      <UserWall />
                    </div>
                  </div>
                </div>
              </PageLayout>
        }
      </div>
    )
  }
}

UserPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  viewableUser: PropTypes.object,
  activeUser: PropTypes.object,
  isFriend: PropTypes.bool
}

export default UserPage
