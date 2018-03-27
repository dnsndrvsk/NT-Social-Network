import { combineReducers } from 'redux'
import { isLoading } from './isLoading'
import { activeUser } from './activeUser'
import { viewableUser } from './viewableUser'
import { additionalInfo } from './additionalInfo'
import { userMessages } from './messages'
import { users } from './users'
//forms
import { videoForm } from './forms/videoForm'
import { registrationForm } from './forms/registrationForm'
import { loginForm } from './forms/loginForm'
//video-player
import { videoPlayer } from './videoPlayer'


const reducers = combineReducers({
  activeUser,
  viewableUser,
  isLoading,
  userMessages,
  users,
  
  //contains isFriend, wasRequestSent, isLiked
  additionalInfo,
  
  //forms
  registrationForm,
  loginForm,
  videoForm,
  
  //video-player
  videoPlayer
})

export default reducers
