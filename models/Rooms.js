const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    participants: [
      {
        type: String,
      },
    ],
    created_By: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rooms", RoomSchema);
