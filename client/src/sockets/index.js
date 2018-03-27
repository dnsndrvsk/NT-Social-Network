import io from 'socket.io-client'
import * as ActionTypes from '../constants'
import { getUserData } from '../actions/user'

const setupSocket = (dispatch) => {
  const socket = io.connect('http://localhost:3002')

  const data = { userID: localStorage.NTactiveUserID }
  if (data.userID) socket.emit('checkAuth', data)

  socket.on('userIsBack', (res) => {
    dispatch(getUserData(data))
  })
  
  return socket
}

export default setupSocket
