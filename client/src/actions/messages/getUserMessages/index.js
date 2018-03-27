import * as actionTypes from '../../../constants'
import { loadingStart, loadingEnd } from '../../loading'
import api from '../../../api'
import { provideToken } from '../../../utils/token'
import { provideActiveUserId } from '../../../utils/activeUser'

const filterData = (data, id) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].receiver === id) {
      return data[i]
    }
  }
}


export const getUserMessages = (friendID) => async dispatch => {
  dispatch(loadingStart())
  
  const userID = provideActiveUserId()
  const token = provideToken()
  const data = { userID, friendID }

  api.getUserMessages(data, token)
    .then(response => {
      const filteredData = filterData(
        response.user.messages,
        data.friendID
      )
      dispatch({
        type: actionTypes.LOAD_USER_MESSAGES,
        payload: { messages: filteredData.history }
      })
      dispatch(loadingEnd())
    })
    .catch(error => {
      console.log(error)
      dispatch(loadingEnd())
    })
}
