import * as actionTypes from '../../../constants'
import { setActiveUserId } from '../../../utils/activeUser'
import { provideUnverifiedUserId, removeUnverifiedUserId } from '../../../utils/unverifiedUser'
import { setToken } from '../../../utils/token'
import api from '../../../api'

export const verify = (history) => async dispatch => {
  const userID = provideUnverifiedUserId()
  if (!userID) history.push('/home')
  
  api.checkVerification({ userID })
    .then(response => {
      removeUnverifiedUserId()
      setActiveUserId(response.user._id)
      setToken(response.token)
      history.push(`/userpage/${response.user._id}`)
      dispatch({
        type: actionTypes.USER_VERIFICATION,
        payload: { activeUser: response.user }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
