import * as actionTypes from '../../../constants'
import { invalidVideoUrl, resetErrors } from './errors'
import { getYoutubeVideoId, getVideoThumb } from '../../../utils/videos'
import api from '../../../api'


export const validateVideoUrl = (url) => async dispatch => {
  dispatch({ type: actionTypes.REMOVE_VIDEO_DATA })
  const videoId = getYoutubeVideoId(url)
  
  api.validateVideoUrl(videoId)
    .then(response => {
      if (response.items.length) {
        const { title } = response.items[0].snippet
        const thumbnail = getVideoThumb(url)
        dispatch(resetErrors())
        dispatch({
          type: actionTypes.SET_VIDEO_DATA,
          payload: { thumbnail, title }
        })
      } else {
        dispatch(invalidVideoUrl())
      }
    })
    .catch(error => {
      console.log(error)
    })
}
