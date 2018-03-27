import { connect } from 'react-redux'
import VideosPageComponent from '../../components/VideosPage'


const VideosPage = connect(state => ({
  activeUser: state.activeUser,
  viewableUser: state.viewableUser
}), {})(VideosPageComponent)

export default VideosPage
