import * as actionTypes from '../../../constants'
import api from '../../../api'
import { provideToken } from '../../../utils/token'
import { provideActiveUserId } from '../../../utils/activeUser'


export const removeFriend = (friendID) => async dispatch => {
  const userID = provideActiveUserId()
  const token = provideToken()
  const data = { userID, friendID }

  api.removeFriend(data, token)
    .then(response => {
      dispatch({
        type: actionTypes.FRIEND_REMOVED,
        payload: { removedFriendID: response.user._id }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
