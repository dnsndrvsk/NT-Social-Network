import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ListItem from 'material-ui/List/ListItem'
import RoundAvatar from '../../RoundAvatar'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ClockImage from 'material-ui/svg-icons/action/schedule'
import DayImage from 'material-ui/svg-icons/action/today'
import { getAllDateData } from '../../../utils/date'
import './Comment.scss'

const imageStyle = {
  height: '14px',
  width: '14px',
  marginLeft: '10px',
  color: '#d2d1d1'
}


const Comment = (props) => {
  
  const { _id, comment, message, user, date  } = props.data
  const { dayN, dayC, time, year } = getAllDateData(date)
  
  const iconButtonElement = (
    <IconButton
      touch={true}
      tooltip="more"
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon />
    </IconButton>
  )

  return (
    <div className="comment">
      <ListItem
        rightIconButton={
          props.isDeletable
            ? <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onClick={() => { props.onDelete(_id) }}>
                  Delete
                </MenuItem>
              </IconMenu>
            : null
        }
        hoverColor="transparent"
        disableTouchRipple={true}
        style={{cursor: "default"}}
      >
        <div className="row">
          <div className="col s2">
            <Link to={`/userpage/${user._id}`}>
              <RoundAvatar user={user} />
            </Link>
          </div>
          <div className="col s10">
            <div className="comment__details">
              <div className="comment__name">{user.name}</div>
              <div className="comment__date">
                <div className="comment__time">
                  <div>{time}</div>
                  <ClockImage style={imageStyle} />
                </div>
                <div className="comment__day">
                  <div>{`${dayC} ${dayN} ${year}`}</div>
                  <DayImage style={imageStyle} />
                </div>
              </div>
            </div>
            <div className="comment__message">{comment || message}</div>
          </div>
        </div>
      </ListItem>
    </div>
  )
}

Comment.propTypes = {
  onDelete: PropTypes.func.isRequired,
  isDeletable: PropTypes.bool
}

export default Comment
