import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import VideoImage from 'material-ui/svg-icons/av/video-library'
import VideosList from '../../VideosList'
import AddVideoForm from '../../../containers/UserPage/Forms/AddVideoForm'
import './UserVideos.scss'

const videoImageStyle = {
  color: 'lightgrey',
  height: '50px',
  width: '50px'
}

class UserVideos extends Component {
  
  render() {
    const isUserLogged = this.props.activeUser
    const { videos } = this.props.viewableUser
    const firstFour = videos.slice(0, 4)
    
    return (
      <div className="user-videos">
        <Paper zDepth={1}>
          {
            videos.length && videos.length >= 1
              ? <div>
                  <Link to={`/videos/${this.props.viewableUser._id}`}>
                    <Subheader>
                      Videos {videos.length}
                    </Subheader>
                  </Link>
                  <VideosList videos={firstFour} shortTitles={true} />
                </div>
              : <div className="user-videos__empty">
                  <VideoImage style={videoImageStyle} />
                  <div>{this.props.viewableUser.name} has not shared any video yet</div>
                </div>
          }
          <div>
            {
              isUserLogged
                && this.props.activeUser._id === this.props.viewableUser._id
                    && <AddVideoForm />
            }
          </div>
        </Paper>
      </div>
    )
  }
}

UserVideos.propTypes = {
  viewableUser: PropTypes.object.isRequired,
  activeUser: PropTypes.object
}

export default UserVideos
