import $ from 'jquery'
import config from '../config'

export default {
  //---------------------------------REGISTRATION
  sendRegisterData(data) {
    return $.ajax({
      url: "/api/auth/signup",
      type: "POST",
      dataType: 'json',
      ContentType: 'application/json',
      data: data
    })
  },
  
  //---------------------------------LOGIN
  sendLoginData(data) {
    return $.ajax({
      url: '/api/auth/login',
      type: 'POST',
      dataType: 'json',
      ContentType: 'application/json',
      data: data
    })
  },
  
  //---------------------------------VERIFICATION
  checkVerification(data) {
    return $.ajax({
      url: '/api/auth/verification',
      type: 'GET',
      dataType: 'json',
      ContentType: 'application/json',
      data: data
    })
  },
  
  //---------------------------------LOGOUT
  logout(data) {
    return $.ajax({
      url: '/api/auth/logout',
      type: 'POST',
      dataType: 'json',
      ContentType: 'application/json',
      data: data
    })
  },
  
  getUserList(data) {
    return $.ajax({
      url: "/api/data/getusers",
      type: "GET",
      data: data,
      dataType: 'json',
      ContentType: 'application/json'
    })
  },
  
  getUserData(data) {
    return $.ajax({
      url: "/api/data/getuser",
      type: "GET",
      data: data,
      dataType: 'json',
      ContentType: 'application/json'
    })
  },
  
  sendFriendRequest(data, token) {
    return $.ajax({
      url: "/api/actions/sendrequest",
      type: "POST",
      dataType: 'json',
      data: data,
      ContentType: 'application/json',
      headers: token
    })
  },
  
  acceptRequest(data, token) {
    return $.ajax({
      url: "/api/actions/acceptrequest",
      type: "POST",
      data: data,
      dataType: 'json',
      ContentType: 'application/json',
      headers: token
    })
  },
  
  deleteRequest(data, token) {
    return $.ajax({
      url: "/api/actions/deleterequest",
      type: "POST",
      data: data,
      dataType: 'json',
      ContentType: 'application/json',
      headers: token
    })
  },
  
  removeFriend(data, token) {
    return $.ajax({
      url: "/api/actions/removefriend",
      type: "POST",
      dataType: 'json',
      data: data,
      ContentType: 'application/json',
      headers: token
    })
  },
  
  sendComment(data, token) {
    return $.ajax({
      url: "/api/actions/addcomment",
      type: "POST",
      data: data,
      dataType: 'json',
      ContentType: 'application/json',
      headers: token
    })
  },
  
  deleteComment(data, token) {
    return $.ajax({
      url: "/api/actions/deletecomment",
      type: "POST",
      data: data,
      dataType: 'json',
      ContentType: 'application/json',
      headers: token
    })
  },
  
  setStatus(data, token) {
    return $.ajax({
      url: "/api/actions/updatestatus",
      type: "POST",
      dataType: 'json',
      ContentType: 'application/json',
      data: data,
      headers: token
    })
  },
  
  setAvatar(data, token) {
    return $.ajax({
      url: "/api/actions/setavatar",
      type: "POST",
      data: data,
      dataType: 'json',
      ContentType: 'application/json',
      headers: token
    })
  },
  
  likeAvatar(data, token) {
    return $.ajax({
      url: "/api/actions/likeavatar",
      type: "POST",
      data: data,
      dataType: 'json',
      ContentType: 'application/json',
      headers: token
    })
  },
  
  getUserMessages(data, token) {
    return $.ajax({
      url: "/api/actions/getmessages",
      type: "GET",
      data: data,
      dataType: 'json',
      ContentType: 'application/json',
      headers: token
    })
  },
  
  deleteMessage(data, token) {
    return $.ajax({
      url: "/api/actions/deletemessage",
      type: "POST",
      data: data,
      dataType: 'json',
      ContentType: 'application/json',
      headers: token
    })
  },
  
  sendMessage(data, token) {
    return $.ajax({
      url: "/api/actions/sendmessage",
      type: "POST",
      dataType: 'json',
      data: data,
      ContentType: 'application/json',
      headers: token
    })
  },
  
  addVideo(data, token) {
    return $.ajax({
      url: "/api/actions/addvideo",
      type: "POST",
      dataType: 'json',
      data: data,
      ContentType: 'application/json',
      headers: token
    })
  },
  
  
  //utils
  validateVideoUrl(videoId) {
    return $.ajax({
      url: `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${config.GOOGLE_API_KEY}
            &fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`,
      dataType: 'jsonp',
      type: "GET",
      crossDomain: true
    })
  }
}
