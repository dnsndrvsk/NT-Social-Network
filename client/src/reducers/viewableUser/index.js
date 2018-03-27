import * as actionTypes from '../../constants'

export const viewableUser = (state = null, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_DATA:
      return state = action.payload.viewableUser
      
    case actionTypes.USER_AVATAR_CHANGE:
      state.avatar = action.payload.avatar
      state.avatarlikes = []
      return Object.assign({}, state)
      
    case actionTypes.CHANGE_USER_STATUS:
      state.status = action.payload.status
      return Object.assign({}, state)
      
    case actionTypes.VIDEO_ADDED:
      state.videos = action.payload.videos
      return Object.assign({}, state)
      
    case actionTypes.USER_LIKE_ADDED:
      state.avatarlikes = action.payload.avatarlikes
      return Object.assign({}, state)
      
    case actionTypes.LEAVE_WALL_COMMENT:
    case actionTypes.DELETE_WALL_COMMENT:
      state.wallcomments = action.payload.wallcomments
      return Object.assign({}, state)
      
    case actionTypes.FRIEND_REMOVED:
      state.friends = state.friends.filter(friend => {
        return friend._id !== action.payload.removedFriendID
      })
      return Object.assign({}, state)
      
    default:
      return state
  }
}
