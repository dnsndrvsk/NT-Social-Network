import * as actionTypes from '../../../../constants'

export const resetErrors = () => ({
  type: actionTypes.RESET_ERRORS
})

export const usernameIsTaken = () => ({
  type: actionTypes.USERNAME_IS_TAKEN
})
