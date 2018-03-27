import * as actionTypes from '../../../constants'
import api from '../../../api'
import { provideToken } from '../../../utils/token'
import { provideActiveUserId } from '../../../utils/activeUser'


export const deleteRequest = (friendID) => async dispatch => {
  const userID = provideActiveUserId()
  const token = provideToken()
  const data = { userID, friendID }

  api.deleteRequest(data, token)
    .then(response => {
      dispatch({
        type: actionTypes.FRIEND_REQUEST_DELETED,
        payload: { activeUser: response.user }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
