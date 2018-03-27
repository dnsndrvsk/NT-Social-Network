import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

class Logout extends Component {
  
  logOut = () => {
    this.props.dispatch()
  }
  
  render() {
    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color="#fff" />
      </IconButton>
    )
    
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={this.logOut}>
          Logout
        </MenuItem>
      </IconMenu>
    )
    
    return (
      <div>
        { rightIconMenu }
      </div>
    )
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default Logout
