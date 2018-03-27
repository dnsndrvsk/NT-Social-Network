import * as actionTypes from '../../../constants'
import { loadingStart, loadingEnd } from '../../loading'
import { resetErrors, wrongUsername, wrongPassword } from './errors'
import { setActiveUserId } from '../../../utils/activeUser'
import { setUnverifiedUserId, removeUnverifiedUserId } from '../../../utils/unverifiedUser'
import { setToken } from '../../../utils/token'
import api from '../../../api'

export const login = (formData, history) => async dispatch => {
  dispatch(loadingStart())
  dispatch(resetErrors())
  
  api.sendLoginData(formData)
    .then(response => {
      dispatch(loadingEnd())
      removeUnverifiedUserId()
      setActiveUserId(response.user._id)
      setToken(response.token)
      history.push(`/userpage/${response.user._id}`)
      dispatch({
        type: actionTypes.USER_LOGIN,
        payload: { activeUser: response.user }
      })
    })
    .catch(error => {
      dispatch(loadingEnd())
      if (error.status === 404) {
        dispatch(wrongUsername())
      } else if (error.status === 400) {
        dispatch(wrongPassword())
      } else if (error.status === 401) {
        setUnverifiedUserId(error.responseJSON.userID)
        history.push('/verification')
      }
    })
}
