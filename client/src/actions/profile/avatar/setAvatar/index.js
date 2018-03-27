import * as actionTypes from '../../../../constants'
import api from '../../../../api'
import { provideToken } from '../../../../utils/token'
import { provideActiveUserId } from '../../../../utils/activeUser'


export const setAvatar = (avatar) => async dispatch => {
  const userID = provideActiveUserId()
  const token = provideToken()
  const data = { userID, avatar }
  
  api.setAvatar(data, token)
    .then(response => {
      dispatch({
        type: actionTypes.USER_AVATAR_CHANGE,
        payload: { avatar: response.user.avatar }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
