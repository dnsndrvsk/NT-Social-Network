import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import VideosList from '../VideosList'


class VideoPlayer extends Component {
  
  togglePlayer = () => {
    this.props.closeVideoPlayer()
  }
  
  render() {
    return (
      <div>
        {
          this.props.isOpen
            &&  <Dialog
                  modal={false}
                  open={this.props.isOpen}
                  onRequestClose={this.togglePlayer}
                  autoDetectWindowHeight={true}
                  autoScrollBodyContent={true}
                >
                  <h1>It is Video Player</h1>
                  <h1>It is Video Player</h1>
                  <h1>It is Video Player</h1>
                </Dialog> 
        }
      </div>
    )
  }
}

VideoPlayer.propTypes = {
  isOpen: PropTypes.bool,
  closeVideoPlayer: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default VideoPlayer
