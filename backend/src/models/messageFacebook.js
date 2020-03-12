import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const messageFacebookSchema = new Schema({
  id: { type: String },
  username: { type: String },
  message: { type: String },
  messageSearch: { type: String },
  type: { type: String },
  deletedAt: { type: Date },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

messageFacebookSchema.index({
  messageSearch: 'text',
})

messageFacebookSchema.plugin(uniqueValidator)

export default mongoose.model('MessageFacebook', messageFacebookSchema)