import * as actionTypes from '../../constants'

const initialState = {
  isOpen: false
}

export const videoPlayer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_VIDEO_PLAYER:
      console.log('opening')
      return {
        ...state,
        isOpen: true
      }
    case actionTypes.CLOSE_VIDEO_PLAYER:
      console.log('closing')
      return {
        ...state,
        isOpen: false
      }
    default:
      return state
  }
}
