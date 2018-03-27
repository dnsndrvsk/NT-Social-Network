import * as actionTypes from '../../../constants'
import api from '../../../api'
import { provideToken } from '../../../utils/token'
import { provideActiveUserId } from '../../../utils/activeUser'


export const leaveWallComment = (comment, friendID) => async dispatch => {
  const userID = provideActiveUserId()
  const token = provideToken()
  const data = { comment, userID, friendID }

  api.sendComment(data, token)
    .then(response => {
      dispatch({
        type: actionTypes.LEAVE_WALL_COMMENT,
        payload: { wallcomments: response.user.wallcomments }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
