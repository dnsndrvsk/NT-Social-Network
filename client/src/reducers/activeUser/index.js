import * as actionTypes from '../../constants'

export const activeUser = (state = null, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
    case actionTypes.USER_LOGOUT:
    case actionTypes.UPDATE_USER_DATA:
    case actionTypes.FRIEND_REQUEST_ACCEPTED:
    case actionTypes.FRIEND_REQUEST_DELETED:
      return state = action.payload.activeUser
    case actionTypes.USER_REGISTRATION:
      return state
    default:
      return state
  }
}
