import * as actionTypes from '../../../../constants'

export const invalidVideoUrl = () => ({
  type: actionTypes.INVALID_VIDEO_URL
})

export const resetErrors = () => ({
  type: actionTypes.RESET_ERRORS
})
