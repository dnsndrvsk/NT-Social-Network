import * as actionTypes from '../../../constants'
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


export const sendMessage = (friendID, message) => async dispatch => {
  const userID = provideActiveUserId()
  const token = provideToken()
  const data = { userID, friendID, message }

  api.sendMessage(data, token)
    .then(response => {
      const filteredData = filterData(
        response.user.messages,
        data.friendID
      )
      dispatch({
        type: actionTypes.USER_SENT_MESSAGE,
        payload: { messages: filteredData.history }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
