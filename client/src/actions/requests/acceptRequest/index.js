import * as actionTypes from '../../../constants'
import api from '../../../api'
import { provideToken } from '../../../utils/token'
import { provideActiveUserId } from '../../../utils/activeUser'


export const acceptRequest = (friendID) => async dispatch => {
  const userID = provideActiveUserId()
  const token = provideToken()
  const data = { userID, friendID }

  api.acceptRequest(data, token)
    .then(response => {
      dispatch({
        type: actionTypes.FRIEND_REQUEST_ACCEPTED,
        payload: { activeUser: response.user }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
