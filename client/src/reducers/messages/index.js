import * as actionTypes from '../../constants'

export const userMessages = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_MESSAGES:
    case actionTypes.UPDATE_USER_MESSAGES:
    case actionTypes.USER_SENT_MESSAGE:
    case actionTypes.USER_DELETED_MESSAGE:
      return state = action.payload.messages
    default:
      return state
  }
}
