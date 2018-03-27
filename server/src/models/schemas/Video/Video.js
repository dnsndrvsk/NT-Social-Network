import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  comments: [{
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
  date: {
    type: Date,
    default: Date.now
  }
})

export default schema
