import * as actionTypes from '../../../constants'
import { loadingStart, loadingEnd } from '../../loading'
import api from '../../../api'
import { provideActiveUserId } from '../../../utils/activeUser'


export const getUserData = (userID) => async dispatch => {
  dispatch(loadingStart())
  const curUserID = provideActiveUserId()
  const data = { curUserID, userID }
  
  api.getUserData(data)
    .then(response => {
      dispatch({
        type: actionTypes.LOAD_USER_DATA,
        payload: {
          viewableUser: response.user,
          isFriend: response.isFriend || null,
          wasRequestSent: response.wasRequestSent || null,
          isLiked: response.isLiked || null
        }
      })
      dispatch(loadingEnd())
    })
    .catch(error => {
      console.log(error)
      dispatch(loadingEnd())
    })
}
