import * as actionTypes from '../../constants'

export const isLoading = (state = false, action) => {
  switch (action.type) {
    case actionTypes.LOADING_START:
      return true
    case actionTypes.LOADING_END:
      return false
    default:
      return state
  }
}
