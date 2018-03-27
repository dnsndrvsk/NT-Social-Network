import * as actionTypes from '../../../constants'
import api from '../../../api'
import { provideToken } from '../../../utils/token'
import { provideActiveUserId } from '../../../utils/activeUser'


export const sendFriendRequest = (friendID) => async dispatch => {
  const userID = provideActiveUserId()
  const token = provideToken()
  const data = { userID, friendID }

  api.sendFriendRequest(data, token)
    .then(response => {
      dispatch({ type: actionTypes.FRIEND_REQUEST_SENT })
    })
    .catch(error => {
      console.log(error)
    })
}
