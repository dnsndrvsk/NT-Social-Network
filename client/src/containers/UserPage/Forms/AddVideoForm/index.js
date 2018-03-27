import { connect } from 'react-redux'
import { validateVideoUrl } from '../../../../actions/video/validateVideoUrl'
import { addVideo } from '../../../../actions/video/addVideo'
import AddVideoComponent from '../../../../components/UserPage/Forms/AddVideoForm'


const mapDispatchToProps = dispatch => ({
  validateVideoUrl: (url) => {
    dispatch(validateVideoUrl(url))
  },
  addVideo: (url, title) => {
    dispatch(addVideo(url, title))
  }
})

const AddVideo = connect(state => ({
  activeUser: state.activeUser,
  invalidVideoUrl: state.videoForm.invalidUrl,
  videoTitle: state.videoForm.title,
  videoThumbnail: state.videoForm.thumbnail
}), mapDispatchToProps)(AddVideoComponent)

export default AddVideo
