import * as actionTypes from '../../../constants'

const initialState = {
  invalidUrl: true,
  title: '',
  thumbnail: ''
}

export const videoForm = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_ERRORS:
      return {
        ...state,
        invalidUrl: false
      }
    case actionTypes.INVALID_VIDEO_URL:
      return {
        ...state,
        invalidUrl: true
      }
    case actionTypes.SET_VIDEO_DATA:
      return {
        ...state,
        title: action.payload.title,
        thumbnail: action.payload.thumbnail,
      }
    case actionTypes.REMOVE_VIDEO_DATA:
      return {
        ...state,
        title: '',
        thumbnail: '',
      }
    default:
      return state
  }
}
