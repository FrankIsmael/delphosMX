const mongoose = require('mongoose')
const PLM = require('passport-local-mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    courses: {
      type: Schema.Types.ObjectId,
      ref: 'Courses'
    },
    name: String,
    email: String,
    photoURL: String,
    role: {
      type: String,
      enum: ['admin', 'teacher','user'],
      default: 'user'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = mongoose.model('User', userSchema)