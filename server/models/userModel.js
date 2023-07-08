import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      default:
        'https://static.vecteezy.com/system/resources/previews/010/160/434/non_2x/people-icon-sign-symbol-design-free-png.png',
    },
  },
  {timestamps: true}
)

export default mongoose.model('user', userSchema)
