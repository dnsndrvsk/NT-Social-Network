import * as actionTypes from '../../constants'


const initialState = {
  isFriend: false,
  wasRequestSent: false,
  isLiked: false
}

export const additionalInfo = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_DATA:
      return {
        isLiked: action.payload.isLiked,
        wasRequestSent: action.payload.wasRequestSent,
        isFriend: action.payload.isFriend
      }
    case actionTypes.FRIEND_REQUEST_SENT:
      return {
        ...state,
        wasRequestSent: true
      }
    case actionTypes.USER_LIKE_ADDED:
      return {
        ...state,
        isLiked: action.payload.isLiked
      }
    case actionTypes.USER_AVATAR_CHANGE:
      return {
        ...state,
        isLiked: false
      }
    case actionTypes.FRIEND_REMOVED:
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        isFriend: false
      }
    default:
      return state
  }
}
