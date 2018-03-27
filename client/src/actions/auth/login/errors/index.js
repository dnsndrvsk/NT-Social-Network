import * as actionTypes from '../../../../constants'

export const resetErrors = () => ({
  type: actionTypes.RESET_ERRORS
})

export const wrongUsername = () => ({
  type: actionTypes.WRONG_USERNAME
})

export const wrongPassword = () => ({
  type: actionTypes.WRONG_PASSWORD
})
