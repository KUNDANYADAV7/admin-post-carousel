import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  photo: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  // role: {
  //   type: String,
  //   required: true,
  //   enum: ["user", "admin"],
  // },
  role: {
    type: String,
    enum: ["admin"], // Only allow "admin"
    default: "admin", // Always set to "admin" by default
    // required: true,
},

  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const User = mongoose.model("User", userSchema);
