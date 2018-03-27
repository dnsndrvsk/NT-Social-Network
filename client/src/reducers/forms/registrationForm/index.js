import * as actionTypes from '../../../constants'

const initialState = {
  usernameIsTaken: false
}

export const registrationForm = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_ERRORS:
      return initialState
    case actionTypes.USERNAME_IS_TAKEN:
      return {
        ...state,
        usernameIsTaken: true
      }
    default:
      return state
  }
}
