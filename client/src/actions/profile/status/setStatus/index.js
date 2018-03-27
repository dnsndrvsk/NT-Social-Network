import * as actionTypes from '../../../../constants'
import api from '../../../../api'
import { provideToken } from '../../../../utils/token'
import { provideActiveUserId } from '../../../../utils/activeUser'


export const setStatus = (status) => async dispatch => {
  const userID = provideActiveUserId()
  const token = provideToken()
  const data = { userID, status }

  api.setStatus(data, token)
    .then(response => {
      dispatch({
        type: actionTypes.CHANGE_USER_STATUS,
        payload: { status: response.user.status }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
