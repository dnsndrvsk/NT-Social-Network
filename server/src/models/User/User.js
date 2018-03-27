import _ from 'lodash'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Promise from 'bluebird'
const bcryptGenSalt = Promise.promisify(bcrypt.genSalt)
const bcryptHash = Promise.promisify(bcrypt.hash)
const bcryptCompare = Promise.promisify(bcrypt.compare)
import mongoose, { Schema } from 'mongoose'
import videoSchema from '../schemas/Video'

export default (ctx) => {
  if (!ctx.log) throw '!log'

  const schema = new Schema({
    username: {
      type: String,
      required: true,
      index: { unique: true },
      tolowercase: true,
      trim: true
    },
    password: {
      type: String
    },
    email: {
      type: String
    },
    name: {
      type: String
    },
    secondName: {
      type: String
    },
    birthDate: {
      type: String
    },
    age: {
      type: Number
    },
    origin: {
      type: String
    },
    avatar: {
      type: String
    },
    status: {
      type: String
    },
    friends: [{
      type : Schema.Types.ObjectId,
      ref: 'User'
    }],
    wallcomments: [{
      user: {
        type : Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }],
    requests: [{
      type : Schema.Types.ObjectId,
      ref: 'User'
    }],
    messages: [{
      receiver: {
        type : Schema.Types.ObjectId,
        ref: 'User'
      },
      history: [{
        user: {
          type : Schema.Types.ObjectId,
          ref: 'User'
        },
        message: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }]
    }],
    newmessages: [{
      user: {
        type : Schema.Types.ObjectId,
        ref: 'User'
      },
      message: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }],
    avatarlikes: [{
      type : Schema.Types.ObjectId,
      ref: 'User'
    }],
    videos: [videoSchema],
    role: {
      type: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    online: {
      currently: {
        type: Boolean,
        default: false
      },
      lastOnline: {
        type: Date,
        default: Date.now
      }
    }
  }, {
    collection: 'user',
    timestamps: true
  })

  schema.statics.isValidEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }
  schema.statics.generatePassword = function (length = 10) {
    return Math.random().toString(36).substr(2, length)
  }
  schema.methods.toJSON = function () {
    return _.omit(this.toObject(), ['password'])
  }
  schema.methods.getIdentity = function (params) {
    const object = _.pick(this.toObject(), ['_id', 'username', 'name', 'avatar', 'role'])
    if (!params) return object
    return Object.assign(object, params)
  }
  schema.methods.generateAuthToken = function (params) {
    return jwt.sign(this.getIdentity(params), ctx.config.jwt.secret)
  }
  schema.methods.verifyPassword = async function (password) {
    return await bcryptCompare(password, this.password)
  }

  const SALT_WORK_FACTOR = 10
  schema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
    return bcryptGenSalt(SALT_WORK_FACTOR)
    .then(salt => {
      bcryptHash(this.password, salt)
      .then(hash => {
        this.password = hash
        next()
      })
    })
    .catch(next)
  })

  return mongoose.model('User', schema)
}
