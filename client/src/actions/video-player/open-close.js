import * as actionTypes from '../../constants'


export const openVideoPlayer = (videoData) => ({
  type: actionTypes.OPEN_VIDEO_PLAYER,
  payload: { videoData }
})

export const closeVideoPlayer = () => ({
  type: actionTypes.CLOSE_VIDEO_PLAYER
})
