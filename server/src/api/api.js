import mongoose from 'mongoose'
import { AsyncRouter } from 'express-async-router'
import _ from 'lodash'
import getAuth from './auth'
import getActions from './user-actions'

export default (ctx) => {
  const api = AsyncRouter()
  
  api.all('/', () => ({ok: true, version: '1.0.1'}))
  api.use('/auth', getAuth(ctx))
  api.use('/actions', getActions(ctx))
  
  
  api.get('/data/getuser', async (req,res) => {
    const User = ctx.models.User
    const userID = req.query.userID
    let curUserID
    if (req.query.curUserID) {
      curUserID = req.query.curUserID
    }
    
    try {
      const user = await User.findById({ _id: userID })
        .populate('friends')
        .populate('wallcomments.user')
        .populate('requests')
        .populate('newmessages.user')
        .populate('messages.receiver')
        .populate('avatarlikes')
      
      /******Cheking if user liked current user avatar******/
      const isLiked = await User.find({
        _id: userID,
        "avatarlikes": {
          $exists: true,
          $eq: curUserID
        }
      }).count() > 0
      
      /******Cheking if user and current user are friends******/
      let friend
      if (req.query.curUserID) {
        friend = await User.findById({ _id: curUserID })
                           .where({ friends: userID })
      }
      
      /******Cheking if user sent friend request to current user******/
      let wasRequestSent
      if (!friend) {
        wasRequestSent = await User.findById({ _id: userID })
                                   .where({ requests: curUserID })
      }
      
      if (friend) {
        res.json({
          user,
          isFriend: true,
          isLiked
        })
      }
      
      if (wasRequestSent) {
        res.json({
          user,
          isFriend: false,
          wasRequestSent: true,
          isLiked
        })
      }
      if (!friend && !wasRequestSent) {
        res.json({
          user,
          isFriend: false,
          isLiked
        })
      }
    } catch (err) {
      return err
    }
  })
  
  api.get('/data/getusers', async (req,res) => {
    const User = ctx.models.User
    const filters = req.query
    const isNoFilters = _.isEmpty(filters)
    let filter
    
    if (!isNoFilters) {
      filters.online = filters.online === 'true' ? true : false
      
      filter = {
        origin: filters.origin,
        age: {
          $gte: filters.ageFrom,
          $lte: filters.ageTo
        },
        'online.currently': filters.online ? filters.online : {$ne: null}
      }
    } else { filter = {} }
    
    try {
      const users = await User.find(filter)
      res.json({
        users
      })
    } catch (err) {
      return err
    }
  })
  
  api.all('/timeout', (req, res) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          some: 123
        })
      }, 10000)
    })
  })
  
  
  return api
}
