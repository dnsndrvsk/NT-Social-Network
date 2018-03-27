import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import Dialog from 'material-ui/Dialog'
import CakeImage from 'material-ui/svg-icons/social/cake'
import UserList from '../../UserList'
import './UserFriends.scss'

const cakeImageStyle = {
  color: 'lightgrey',
  height: '50px',
  width: '50px'
}

const headerStyle = {
  cursor: 'pointer'
}


class UserFriends extends Component {
  constructor(props) {
    super(props)
    
    this.state = { isAllOpen: false }
  }
  
  toggleShowAll = () => {
    this.setState({ isAllOpen: !this.state.isAllOpen })
  }
  
  render() {
    let { friends } = this.props.viewableUser
    friends = this.props.showOnline ? friends.filter((friend) => {return friend.online.currently}) : friends
    const firstFive = friends.slice(0, 5)
    
    return (
      <div className="user-friends">
        <Paper zDepth={1}>
          {
            friends.length && friends.length >= 1
              ? <div>
                  <Subheader
                    onClick={friends.length > 5 ? this.toggleShowAll : null}
                    style={headerStyle}
                  >
                    {this.props.showOnline ? 'Online' : 'Friends'} {friends.length}
                  </Subheader>
                  <UserList
                    users={firstFive}
                    hideButtons={true}
                  />
                  <Dialog
                    repositionOnUpdate={true}
                    autoScrollBodyContent={true}
                    modal={false}
                    open={this.state.isAllOpen}
                    onRequestClose={this.toggleShowAll}
                  >
                    <UserList
                      users={friends}
                      showFullNames={true}
                      secondMode={true}
                    />
                  </Dialog>
                </div>
              : this.props.showOnline
                  ? null
                  : <div className="user-friends__empty">
                      <CakeImage style={cakeImageStyle} />
                      <div>{this.props.viewableUser.name} has no friends yet</div>
                    </div>
          }
        </Paper>
      </div>
    )
  }
}

UserFriends.propTypes = {
  viewableUser: PropTypes.object.isRequired
}

export default UserFriends
