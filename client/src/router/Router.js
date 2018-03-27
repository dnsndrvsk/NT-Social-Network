import React from 'react'
import { BrowserRouter,
         Route,
         Switch, 
         Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

/********* Navigation *********/
import Navigation from '../containers/Navigation'
/********* Video Player *********/
import VideoPlayer from '../containers/VideoPlayer'
/********* Pages *********/
import HomePage from '../components/HomePage'
import RegistrationPage from '../components/RegistrationPage'
import VerificationPage from '../components/VerificationPage'
import LoginPage from '../components/LoginPage'
import UserPage from '../containers/UserPage'
import SearchPage from '../containers/SearchPage'
import ChatPage from '../containers/ChatPage'
import VideosPage from '../containers/VideosPage'
import MessagesPage from '../components/MessagesPage'
import PageNotFound from '../components/Errors/404'

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <MuiThemeProvider>
          <div>
            <Navigation />
            <VideoPlayer />
            <div>
              <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/registration" component={RegistrationPage} />
                <Route path="/verification" component={VerificationPage} />
                <Route path="/userpage/:id" component={UserPage} />
                <Route path="/friends" component={SearchPage} />
                <Route path="/chatroom/:id" component={ChatPage} />
                <Route path="/videos/:id" component={VideosPage} />
                <Route path="/messages" component={MessagesPage} />
                <Redirect from="/" to="/home" />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    </div>
  )
} 

export default Routes
