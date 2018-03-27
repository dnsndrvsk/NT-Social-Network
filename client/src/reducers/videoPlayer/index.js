import * as actionTypes from '../../constants'

const initialState = {
  isOpen: false,
  playing: null
}

export const videoPlayer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_VIDEO_PLAYER:
      return {
        ...state,
        playing: action.payload.videoData,
        isOpen: true
      }
    case actionTypes.CLOSE_VIDEO_PLAYER:
      return {
        ...state,
        playing: null,
        isOpen: false
      }
    default:
      return state
  }
}
