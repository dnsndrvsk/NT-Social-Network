import * as actionTypes from '../../../constants'
import api from '../../../api'
import { provideToken } from '../../../utils/token'
import { provideActiveUserId } from '../../../utils/activeUser'


export const deleteWallComment = (commentID) => async dispatch =>  {
  const userID = provideActiveUserId()
  const token = provideToken()
  const data = { userID, commentID }

  api.deleteComment(data, token)
    .then(response => {
      dispatch({
        type: actionTypes.DELETE_WALL_COMMENT,
        payload: { wallcomments: response.user.wallcomments }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
