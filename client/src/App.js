import React, { Component } from 'react'
import { Provider } from 'react-redux'
import io from 'socket.io-client'
import store from './store'
import Router from './router/Router'
import './styles/main.scss'

let socket

class App extends Component {
  constructor(props) {
    super(props)
    
    socket = io.connect('http://localhost:3002')
    const data = { userID: localStorage.NTactiveUserID }
    if (data.userID) socket.emit('checkAuth', data)
    
    socket.on('userIsBack',(res) => {
      console.log('USER IS BAAACK')
    })
  }
  
  componentWillUnmount() {
    socket.disconnect()
  }
  
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App
