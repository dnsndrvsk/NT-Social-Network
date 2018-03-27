import * as actionTypes from '../../../constants'
import { loadingStart, loadingEnd } from '../../loading'
import api from '../../../api'

export const getUserList = (filters) => async dispatch => {
  const data = filters || null
  dispatch(loadingStart())

  api.getUserList(data)
    .then(response => {
      dispatch({
        type: actionTypes.GET_ALL_USERS,
        payload: { users: response.users }
      })
      dispatch(loadingEnd())
    })
    .catch(error => {
      console.log(error)
      dispatch(loadingEnd())
    })
}
