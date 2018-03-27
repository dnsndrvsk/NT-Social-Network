import mongoose, { Schema } from 'mongoose'

export default (ctx) => {
  const schema = new Schema({
    user: {
      type : Schema.Types.ObjectId,
      ref: 'User'
    }
  })

  return mongoose.model('Verification', schema)
}
