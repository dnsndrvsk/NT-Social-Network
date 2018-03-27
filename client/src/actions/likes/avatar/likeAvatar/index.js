import * as actionTypes from '../../../../constants'
import api from '../../../../api'
import { provideToken } from '../../../../utils/token'
import { provideActiveUserId } from '../../../../utils/activeUser'


export const likeAvatar = (friendID) => async dispatch => {
  const userID = provideActiveUserId()
  const token = provideToken()
  const data = { userID, friendID }
  
  api.likeAvatar(data, token)
    .then(response => {
      dispatch({
        type: actionTypes.USER_LIKE_ADDED,
        payload: {
          isLiked: response.isLiked,
          avatarlikes: response.user.avatarlikes
        }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
