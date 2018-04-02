import React, { Component } from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import store from './store'
import Router from './router'
import { setupSocket } from './sockets'
import './styles/main.scss'

let socket


class App extends Component {
  constructor(props) {
    super(props)
    
    socket = setupSocket()
  }
  
  componentWillUnmount() {
    socket.disconnect()
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
