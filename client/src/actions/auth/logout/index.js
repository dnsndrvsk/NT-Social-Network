import * as actionTypes from '../../../constants'
import { provideActiveUserId, removeActiveUserId } from '../../../utils/activeUser'
import { removeToken } from '../../../utils/token'
import api from '../../../api'

export const logout = () => async dispatch => {
  const userID = provideActiveUserId()
  
  api.logout({ userID })
    .then(response => {
      removeActiveUserId()
      removeToken()
      dispatch({
        type: actionTypes.USER_LOGOUT,
        payload: { activeUser: null }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
