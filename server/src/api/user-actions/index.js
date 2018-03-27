import mongoose from 'mongoose'
import { AsyncRouter } from 'express-async-router'
import jwt from 'express-jwt'
import _ from 'lodash'

const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split( ' ' )[ 0 ] === 'Bearer') {
    return req.headers.authorization.split( ' ' )[ 1 ]
  } else if (req.headers['x-access-token']) {
    return req.headers['x-access-token']
  } else if ( req.query && req.query.token ) {
    return req.query.token
  } else if ( req.cookies && req.cookies.token  ) {
    return req.cookies.token
  }
  return null
}

export default (ctx) => {
  const api = AsyncRouter()
  //route middleware to verify a token
  api.use((req, res, next) => {
    const token = getToken(req)
    req.token = token
    const options = {
      secret: ctx.config && ctx.config.jwt.secret || 'HIDDEN_SECRET',
      getToken: req => req.token
    }
    jwt(options)(req, res, (err) => {
      if (err) req._errJwt = err
    })
    if (req._errJwt) return next(req._errJwt)
    next()
  })
  
  
  api.post('/updatestatus', async (req,res) => {
    const { userID, status } = req.body
    const User = ctx.models.User
    
    try {
      await User.update({ _id: userID }, { status: status })
      const user = await User.findOne({ _id: userID })
      res.json({
        user
      })
    } catch (err) {
      return err
    }
  })
  
  api.post('/addcomment', async (req,res) => {
    const friendID = req.body.friendID
    const data = {
      user: req.body.userID,
      comment: req.body.comment
    }
    const User = ctx.models.User
    
    try {
      await User.update(
        { _id: friendID },
        { $push: {
            "wallcomments": {
              "$each" : [ data ],
              "$sort" : { "date" : -1 }
            }
          }
        }
      )
      
      const user = await User.findById({ _id: friendID })
                             .populate('wallcomments.user')
      res.json({
        user
      })
    } catch (err) {
      return err
    }
  })
  
  api.post('/deletecomment', async (req,res) => {
    const { userID, commentID } = req.body
    const User = ctx.models.User
    
    try {
      await User.update(
        { _id: userID },
        { $pull: {
            'wallcomments': { _id: commentID }
          }
        }
      )
      const user = await User.findById({ _id: userID })
                             .populate('wallcomments.user')
      res.json({
        user
      })
    } catch (err) {
      return err
    }
  })
  
  api.post('/sendrequest', async(req, res) => {
    const { userID, friendID } = req.body
    const User = ctx.models.User
    
    try {
      await User.update(
        { _id: friendID },
        { $push: { 'requests': userID } }
      )
      res.json({
        wasRequestSent: true
      })
    } catch (err) {
      return err
    }
  })
  
  api.post('/acceptrequest', async (req, res) => {
    const { userID, friendID } = req.body
    const User = ctx.models.User
    try {
      const user = await User.findById({ _id: userID })
      const alreadyFriends = await User.find({
        _id: userID,
        "friends": {
          $exists: true,
          $eq: friendID
        }
      }).count() > 0
      
      if (alreadyFriends) {
        await User.update(
          { _id: userID },
          { $pull: { 'requests': friendID } }
        )
        
        await User.update(
          { _id: friendID },
          { $pull: { 'requests': userID } }
        )
        
        const user = await User.findById({ _id: userID })
                               .populate('requests')
        res.json({
          user
        })
      }
      if (!alreadyFriends) {
        await User.update(
          { _id: userID   },
          { $push: { 'friends' : friendID } }
        )
        
        await User.update(
          { _id: friendID },
          { $push: { 'friends' : userID } }
        )
        
        await User.update(
          { _id: userID },
          { $pull: { 'requests': friendID } }
        )
        
        const user = await User.findById({ _id: userID })
                               .populate('requests')
        res.json({
          user
        })
      }
    } catch (err) {
      return err
    }
  })
  
  api.post('/removefriend', async (req, res) => {
    const { userID, friendID } = req.body
    const User = ctx.models.User
    
    try {
      await User.update(
        { _id: userID },
        { $pull: { 'friends': friendID } }
      )
      
      await User.update(
        { _id: friendID },
        { $pull: { 'friends': userID } }
      )
      
      const user = await User.findById({ _id: userID })
      res.json({
        user
      })
    } catch (err) {
      return err
    }
  })
  
  api.post('/deleterequest', async (req, res) => {
    const { userID, friendID } = req.body
    const User = ctx.models.User
    
    try {
      await User.update(
        { _id: userID },
        { $pull: { 'requests': friendID } }
      )
      
      const user = await User.findById({ _id: userID })
                             .populate('requests')
      res.json({
        user
      })
    } catch (err) {
      return err
    }
  })
  
  api.post('/sendmessage', async (req, res) => {
    const { userID, friendID, message } = req.body
    const User = ctx.models.User
    
    try {
      const chatExist = await User.find({
        _id: userID,
        "messages.receiver": {
          $exists: true,
          $eq: friendID
        }
      }).count() > 0
      
      if (chatExist) {
        await User.update(
          { _id: userID,
            "messages.receiver": friendID
          },
          { $push: {
              "messages.$.history": {
                user: userID,
                message: message
              }
            }
          }
        )
        
        await User.update(
          { _id: friendID,
            "messages.receiver": userID
          },
          { $push: {
              "messages.$.history": {
                user: userID,
                message: message
              }
            }
          }
        )
        
        
        /*************ADDING NEW MESSAGES NOTIFICATION**************************/
        const newExists = await User.find({
          _id: friendID,
          "newmessages.user": {
            $exists: true,
            $eq: userID
          }
        }).count() > 0
        
        if (newExists) {
          await User.update(
            { _id: friendID },
            { $pull: {
                'newmessages': { user: userID }
              }
            }
          )
          
          await User.update(
            { _id: friendID },
            { $push: {
                "newmessages": {
                  user: userID,
                  message: message
                }
              }
            }
          )
        }
        
        if (!newExists) {
          await User.update(
            { _id: friendID },
            { $push: {
                "newmessages": {
                  user: userID,
                  message: message
                }
              }
            }
          )
        }
        /*************ADDING NEW MESSAGES NOTIFICATION**************************/
        
      }
      if (!chatExist) {
        await User.update(
          { _id: userID },
          { $push: {
              "messages": {
                "$each": [{ receiver: friendID }]
              }
            }
          }
        )
        
        await User.update(
          { _id: friendID },
          { $push: {
              "messages": {
                "$each": [{ receiver: userID }]
              }
            }
          }
        )
        
        await User.update(
          { _id: userID,
            "messages.receiver": friendID
          },
          { $push: {
              "messages.$.history": {
                user: userID,
                message: message
              }
            }
          }
        )
        
        await User.update(
          { _id: friendID,
            "messages.receiver": userID
          },
          { $push: {
              "messages.$.history": {
                user: userID,
                message: message
              }
            }
          }
        )
        
        /*************ADDING NEW MESSAGES NOTIFICATION**************************/
        const newExists = await User.find({
          _id: friendID,
          "newmessages.user": {
            $exists: true,
            $eq: userID
          }
        }).count() > 0
        
        if (newExists) {
          await User.update(
            { _id: friendID },
            { $pull: {
                'newmessages': { user: userID }
              }
            }
          )
          
          await User.update(
            { _id: friendID },
            { $push: {
                "newmessages": {
                  user: userID,
                  message: message
                }
              }
            }
          )
        }
        
        if (!newExists) {
          await User.update(
            { _id: friendID },
            { $push: {
                "newmessages": {
                  user: userID,
                  message: message
                }
              }
            }
          )
        }
        /*************ADDING NEW MESSAGES NOTIFICATION**************************/
        
      }
      const user = await User.findById({ _id: userID })
                             .populate('messages.history.user')
      res.json({
        user
      })
    } catch (err) {
      return err
    }
  })
  
  api.get('/getmessages', async (req, res) => {
    const { userID, friendID } = req.query
    const User = ctx.models.User
    
    try {
      /************REMOVING NEW MESSAGE IF EXIST*************/
      const newExists = await User.find({
        _id: userID,
        "newmessages.user": {
          $exists: true,
          $eq: friendID
        }
      }).count() > 0
      
      if (newExists) {
        await User.update(
          { _id: userID },
          { $pull: {
              'newmessages': { user: friendID }
            }
          }
        )
      }
      /************REMOVING NEW MESSAGE IF EXIST*************/
      
      const user = await User.findById({ _id: userID })
                             .populate('messages.history.user')
      res.json({
        user
      })
    } catch (err) {
      return err
    }
  })
  
  api.post('/deletemessage', async (req,res) => {
    const { userID, friendID, messageID } = req.body
    const User = ctx.models.User
    
    try {
      await User.update(
        { _id: userID,
          "messages.receiver": friendID
        },
        { $pull: {
            "messages.$.history": { _id: messageID }
          }
        }
      )
      
      const user = await User.findById({ _id: userID })
                             .populate('messages.history.user')
      res.json({
        user
      })
    } catch (err) {
      return err
    }
  })
  
  api.post('/setavatar', async (req, res) => {
    const { userID, avatar } = req.body
    const User = ctx.models.User
    
    try {
      await User.update({ _id: userID }, { 'avatar': avatar })
      await User.update(
        { _id: userID },
        { $set: { 'avatarlikes': [] } }
      )
      
      const user = await User.findById({ _id: userID })
      res.json({
        user
      })
    } catch (err) {
      return err
    }
  })
  
  api.post('/likeavatar', async (req, res) => {
    const { userID, friendID } = req.body
    const User = ctx.models.User
    let isLiked
    
    try {
      const alreadyLiked = await User.find({
        _id: friendID,
        "avatarlikes": {
          $exists: true,
          $eq: userID
        }
      }).count() > 0
      
      if (!alreadyLiked) {
        await User.update(
          { _id: friendID },
          { $push: { 'avatarlikes': userID } }
        )
        isLiked = true
      }
      
      if (alreadyLiked) {
        await User.update(
          { _id: friendID },
          { $pull: { 'avatarlikes': userID } }
        )
        isLiked = false
      }
      
      const user = await User.findById({ _id: friendID })
                             .populate('avatarlikes')
      res.json({
        user,
        isLiked
      })
    } catch (err) {
      return err
    }
  })
  
  api.post('/addvideo', async (req,res) => {
    const { userID, url, title } = req.body
    const User = ctx.models.User
    const data = { url, title }
    
    try {
      await User.update(
        { _id: userID },
        { $push: {
            videos: {
              "$each" : [ data ],
              "$sort" : { "date" : -1 }
            }
          }
        }
      )
      
      const user = await User.findOne({ _id: userID })
      
      res.json({
        user
      })
    } catch(error) {
      res.status(500).send('Something went wrong')
    }
    
  })
  
  
  return api
}
