import io from 'socket.io-client'
import config from '../config'
import { provideActiveUserId } from '../utils/activeUser'

let socket


export const setupSocket = () => {
  socket = io.connect(config.API_SERVER)
  const data = { userID: provideActiveUserId() }
  if (data.userID) socket.emit('checkAuth', data)
  
  socket.on('userIsBack',(res) => {
    alert(`Welcome back ${res.user.name}`)
  })
  
  return socket
}
