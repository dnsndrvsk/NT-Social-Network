import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import JoinImage from 'material-ui/svg-icons/action/input'


const Join = (props) => (
  <div>
    <Link to="/home">
      <IconButton tooltip="Join Us">
        <JoinImage color="#fff" />
      </IconButton>
    </Link>
  </div>
)

export default Join
