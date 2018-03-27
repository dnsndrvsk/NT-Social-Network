import * as actionTypes from '../../../constants'
import api from '../../../api'
import { provideActiveUserId } from '../../../utils/activeUser'


export const updateUserData = () => async dispatch => {
  console.log('Updating user data...')
  const userID = provideActiveUserId()
  
  if (userID) {
    const data = { userID }
    
    api.getUserData(data)
      .then(response => {
        dispatch({
          type: actionTypes.UPDATE_USER_DATA,
          payload: { activeUser: response.user }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
