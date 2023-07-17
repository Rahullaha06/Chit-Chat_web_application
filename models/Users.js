const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      
    },
    name: {
      type: String,
      min: 3,
      max: 20,
      
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      
    },
    phoneNumber: {
      type: String,
      max: 10,
      
    },
    phoneOtp: String,
    verifiedUser: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
    },
    password: {
      type: String,
      min: 3,
    },
    about: {
      type: String,
      max: 1000,
    },
    rooms_created: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rooms",
      },
    ],
    rooms_entered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rooms",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UsersSchema);
