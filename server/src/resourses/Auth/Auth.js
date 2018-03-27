import jwt from 'express-jwt'

//adding---
import nodemailer from 'nodemailer'
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "ntsocialnetworktech@gmail.com",
        pass: "foxerbixerrrr"
    }
})
let mailOptions, link
//--------



export function canonize(str) {
  return str.toLowerCase().trim()
}

export default (ctx) => {
  const User = ctx.models.User
  const Verification = ctx.models.Verification
  const resourse = {}

  resourse.getUserFields = function (req) {
    return req.body
  }
  
  resourse.getUserCriteria = function (req, res) {
    const params = req.body
    if (params.username) {
      return {
        username: canonize(params.username)
      }
    }
    return res.status(400).send('Did not find username, email, login parameters')
  }
  
  resourse.validate = async function (req) {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).send('No user found in database')
    return {
      __pack: 1,
      jwt: req.user,
      user: user
    }
  }
  
  resourse.signup = async function (req, res) {
    try {
      const userFields = resourse.getUserFields(req, res)
      const criteria = resourse.getUserCriteria(req, res)
      const existUser = await User.findOne(criteria)
      if (existUser) return res.status(400).send('Username with this email or username is already registered')
      
      const user = new User(userFields)
      await user.save()
      // rand = Math.floor((Math.random() * 100) + 54)
      const verification = new Verification({ user: user._id })
      await verification.save()
      link = "http://" + req.get('host') + "/api/auth/verify?id=" + verification._id
      mailOptions = {
        to: userFields.email,
        subject: "Please confirm your Email account",
        html: '<div style="text-align: center; padding: 150px 0; background-color: #f1f1f1;"><div style="display: inline-block; width: 50%; padding: 40px; background-color: #fff;"><div style="padding-bottom: 30px;"><div style="font-size: 16px; line-height: 1.3; color: #777;">Greetings from</div><div style="padding-bottom: 20px; font-size: 25px; line-height: 1.5; color: #111;"><b>NT Social Network</b></div><div  style="font-size: 16px; line-height: 1.3; color: #777;">Click on the link below to verify your email address.</div></div><div style="font-size: 30px; font-weight: 700;"><a href='+link+' style="color: #00bcd4; text-decoration: none;">Verify email &#8680;</a></div></div></div>'
      }
      smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
          console.log(error)
          return res.status(500).send(error)
        } else {
          console.log("Message sent: " + response.message)
        }
      })
      return res.json({
        user: user,
        success: true,
        message: 'Waiting for account verification'
      })
    } catch(err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }
  
  resourse.verification = async function (req, res) {
    const { userID } = req.query
    if (!userID) return res.status(400).send('There is no user to verify')
    const user = await User.findOneAndUpdate({_id: userID}, {$set: {'online.currently': true}})
    if (!user) return res.status(404).send('There is no such user')
    if (user.isVerified) {
      return res.json({
        __pack: 1,
        user,
        token: user.generateAuthToken()
      })
    } else {
      return res.status(400).send('This account is not verified yet')
    }
  }
  
  resourse.verify = async function (req, res) {
    if ((req.protocol+"://"+req.get('host'))==("http://"+req.get('host'))) {
      console.log("Domain is matched. Information is from Authentic email")
      try {
        const verification = await Verification.findById({ _id: req.query.id })
        if (verification) {
          try {
            await User.update({ _id: verification.user }, { $set: { isVerified: true } })
          } catch (error) {
            res.end("<h1>Email has been successfully verified</h1>")
          }
          await verification.remove()
          res.end("<h1>Email has been successfully verified</h1>")
        } else {
          console.log("email is not verified")
          res.end("<h1>Bad Request</h1>")
        }
      } catch(error) {
        res.end("<h1>Request is from unknown source</h1>")
      }
    }
  }

  resourse.login = async function (req, res) {
    const params = resourse.getUserFields(req, res)
    
    if (!params.password) return res.status(400).send('Password parameter not passed')

    const criteria = resourse.getUserCriteria(req)
    const user = await User.findOneAndUpdate(criteria, {$set: {'online.currently': true}})

    if (!user) return res.status(404).send('No user found in database')

    if (!await user.verifyPassword(params.password)) {
      return res.status(400).send('The given password does not match')
    }
    
    if (user && !user.isVerified) return res.status(401).send({message: 'This account is not verified yet', userID: user._id})

    return res.json({
      __pack: 1,
      user,
      token: user.generateAuthToken()
    })
  }
  
  resourse.logout = async function(req, res) {
    const { userID } = req.body
    try {
      await User.findOneAndUpdate({_id: userID}, {$set: {'online.currently': false, 'online.lastOnline': new Date}})
      res.json({ success: true })
    } catch (error) {
      res.status(500).send('Something went wrong')
    }
  }

  resourse.getToken = function (req) {
    if (req.headers.authorization && req.headers.authorization.split( ' ' )[ 0 ] === 'Bearer') {
      return req.headers.authorization.split( ' ' )[ 1 ]
    } else if (req.headers['x-access-token']) {
      return req.headers['x-access-token']
    } else if ( req.query && req.query.token ) {
      return req.query.token
    } else if ( req.cookies && req.cookies.token  ) {
      return req.cookies.token
    }
    if (__DEV__ && ctx.config && ctx.config.jwt && ctx.config.jwt.devToken) return ctx.config.jwt.devToken
    return null
  }

  resourse.parseToken = function (req, res, next) {
    const token = resourse.getToken(req)
    req.token = token
    next()
  }

  resourse.parseUser = function (req, res, next) {
    const options = {
      secret: ctx.config && ctx.config.jwt.secret || 'SECRET',
      getToken: req => req.token
    }
    jwt(options)(req, res, (err) => {
      if (err) req._errJwt = err
      next()
    })
  }

  resourse.isAuth = function (req, res, next) {
    if (req._errJwt) return next(req._errJwt)
    if (!req.user || !req.user._id) return res.status(401).send('!req.user')
    next()
  }
  

  return resourse
}
