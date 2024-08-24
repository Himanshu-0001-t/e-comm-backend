import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  role:
  {
    type: String, enum: ['customer', 'admin'],
    default: 'customer'
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User