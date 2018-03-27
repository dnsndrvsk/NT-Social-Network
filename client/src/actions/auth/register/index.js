import * as actionTypes from '../../../constants'
import { loadingStart, loadingEnd } from '../../loading'
import { resetErrors, usernameIsTaken } from './errors'
import { setUnverifiedUserId } from '../../../utils/unverifiedUser'
import api from '../../../api'


export const register = (formData, history) => async dispatch => {
  dispatch(loadingStart())
  dispatch(resetErrors())
  
  api.sendRegisterData(formData)
    .then(response => {
      dispatch(loadingEnd())
      dispatch({ type: actionTypes.USER_REGISTRATION })
      setUnverifiedUserId(response.user._id)
      history.push('/verification')
    })
    .catch(error => {
      dispatch(loadingEnd())
      if (error.status === 400) {
        dispatch(usernameIsTaken())
      }
    })
}
