import { connect } from 'react-redux'
import { openVideoPlayer } from '../../../actions/video-player/open-close'
import VideoPostComponent from '../../../components/VideosList/VideoPost'

const mapDispatchTpProps = dispatch => ({
  openVideoPlayer: () => {
    dispatch(openVideoPlayer())
  }
})

const VideoPost = connect(state => ({}), mapDispatchTpProps)(VideoPostComponent)

export default VideoPost
