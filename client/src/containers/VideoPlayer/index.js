import { connect } from 'react-redux'
import VideoPlayerComponent from '../../components/VideoPlayer'
import { closeVideoPlayer } from '../../actions/video-player/open-close'

const mapDispatchToProps = dispatch => ({
  closeVideoPlayer: () => {
    dispatch(closeVideoPlayer())
  }
})

const VideoPlayer = connect(state => ({
  user: state.viewableUser,
  isOpen: state.videoPlayer.isOpen
}), mapDispatchToProps)(VideoPlayerComponent)

export default VideoPlayer
