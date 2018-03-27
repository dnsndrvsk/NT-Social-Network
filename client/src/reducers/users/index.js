import * as actionTypes from '../../constants'

export const users = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS:
      return state = action.payload.users
    default:
      return state
  }
}
