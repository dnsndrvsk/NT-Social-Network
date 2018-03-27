import * as actionTypes from '../../../constants'

const initialState = {
  wrongUsername: false,
  wrongPassword: false
}

export const loginForm = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_ERRORS:
      return initialState
    case actionTypes.WRONG_USERNAME:
      return {
        ...state,
        wrongUsername: true
      }
    case actionTypes.WRONG_PASSWORD:
      return {
        ...state,
        wrongPassword: true
      }
    default:
      return state
  }
}
