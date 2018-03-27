import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Userbar from '../../containers/Navigation/Userbar'
import config from '../../config'
import './Navigation.scss'


class Navigation extends Component {
  constructor(props) {
    super(props)
    
    this.state = { isDrawerVisible: false }
  }
  
  toggleDrawer = () => {
    this.setState({ isDrawerVisible: !this.state.isDrawerVisible })
  }
  
  
  render() {
    return (
      <div className="main-nav">
        <AppBar 
          title={config.name}
          zDepth={1}
          showMenuIconButton={this.props.activeUser ? true : false}
          iconElementRight={<Userbar />}
          onLeftIconButtonTouchTap={this.toggleDrawer}
        />
        {
          this.props.activeUser
            ? <Drawer 
                open={this.state.isDrawerVisible}
                openSecondary={false}
              >
                <AppBar
                  title={config.name}
                  zDepth={1}
                  onLeftIconButtonTouchTap={this.toggleDrawer}
                  iconElementLeft={
                    <IconButton>
                      <NavigationClose />
                    </IconButton>
                  }
                />
                <Link
                  to={`/userpage/${this.props.activeUser._id}`}
                  onClick={this.toggleDrawer}
                >
                  <MenuItem>My Profile</MenuItem>
                </Link>
                <Link
                  to='/messages'
                  onClick={this.toggleDrawer}
                >
                  <MenuItem>My Messages</MenuItem>
                </Link>
                <Link
                  to={`/videos/${this.props.activeUser._id}`}
                  onClick={this.toggleDrawer}
                >
                  <MenuItem>My Videos</MenuItem>
                </Link>
                <Link
                  to='/friends'
                  onClick={this.toggleDrawer}
                >
                  <MenuItem>Find Friends</MenuItem>
                </Link>
              </Drawer>
            : null
        }
      </div>
    )
  }
}

Navigation.propTypes = {
  activeUser: PropTypes.object
}

export default Navigation
