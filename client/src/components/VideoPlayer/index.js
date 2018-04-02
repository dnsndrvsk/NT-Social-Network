import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import InputComponent from '../InputComponent'
import CommentList from '../CommentList'
import { getEmbedVideoUrl } from '../../utils/videos'

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '0',
    paddingBottom: '56.25%'
  },
  video: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%'
  }
}


class VideoPlayer extends Component {
  
  addComment = (comment) => {
    
  }
  
  render() {
    const { url, comments } = this.props.playing || ''
    
    return (
      <div>
        {
          this.props.isOpen
            &&  <Dialog
                  modal={false}
                  open={this.props.isOpen}
                  onRequestClose={this.props.closeVideoPlayer}
                  autoDetectWindowHeight={true}
                  autoScrollBodyContent={true}
                >
                  <div style={styles.wrapper}>
                    <iframe
                      title={url}
                      style={styles.video}
                      src={getEmbedVideoUrl(url) + '?autoplay=1'}
                      allowFullScreen="allowfullscreen"
                      width="100%"
                      height="auto"
                    >
                    </iframe>
                  </div>
                  {
                    this.props.activeUser
                      &&  <div style={{padding: '30px 0'}}>
                            It is not working for now...
                            <InputComponent
                              hintText="Write a comment..."
                              btnLabel="Add"
                              onSubmit={this.addComment}
                            />
                          </div>
                  }
                </Dialog> 
        }
      </div>
    )
  }
}

VideoPlayer.propTypes = {
  isOpen: PropTypes.bool,
  playing: PropTypes.object,
  closeVideoPlayer: PropTypes.func.isRequired,
  viewableUser: PropTypes.object,
  activeUser: PropTypes.object
}

export default VideoPlayer
