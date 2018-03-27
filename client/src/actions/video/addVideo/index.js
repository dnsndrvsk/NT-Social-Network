import * as actionTypes from '../../../constants'
import { provideToken } from '../../../utils/token'
import { provideActiveUserId } from '../../../utils/activeUser'
import api from '../../../api'


export const addVideo = (url, title) => async dispatch => {
  dispatch({ type: actionTypes.REMOVE_VIDEO_DATA })
  const userID = provideActiveUserId()
  const token = provideToken()
  const data = { userID, url, title }
  
  api.addVideo(data, token)
    .then(response => {
      dispatch({
        type: actionTypes.VIDEO_ADDED,
        payload: { videos: response.user.videos }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
