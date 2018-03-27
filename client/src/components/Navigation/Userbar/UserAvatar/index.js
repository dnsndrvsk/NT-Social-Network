import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'

const UserAvatar = (props) => (
  <div>
    <Link to={`/userpage/${props.activeUser._id}`}>
      <Avatar src={props.activeUser.avatar} />
    </Link>
  </div>
)

UserAvatar.propTypes = {
  activeUser: PropTypes.object.isRequired
}

export default UserAvatar
