const Rooms = require("../models/Rooms");
const Users = require("../models/Users");

const createRooms = async (req, res) => {
  try {
    const { createdBy, name } = req.body;
    const room_name = await Rooms.findOne({ name: name });
    if (room_name) return res.status(400).json("Room Name Already Exists");
    const new_room = new Rooms({
      name: name,
      created_By: createdBy,
    });
    new_room.participants.push(createdBy);

    const room = await new_room.save();
    await Users.findOneAndUpdate(
      {
        id: createdBy,
      },
      {
        $push: { rooms_created: room._id },
      }
    );
    return res.status(201).json("New room is created");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const joinRooms = async (req, res) => {
  try {
    const { roomId, userId } = req.body;
    const room = await Rooms.findOne({ _id: roomId });
    if (!room) return res.status(400).json("Room doesnt exists");
    if (room.participants.includes(userId))
      return res.status(400).json("User Already Joined");
    room.participants.push(userId);
    await room.save();
    await Users.findOneAndUpdate(
      {
        id: userId,
      },
      {
        $push: { rooms_entered: room._id },
      }
    );

    return res.status(201).json("Room Joined Succesfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const GetRoomsCreatedAndJoined = async (req, res) => {
  try {
    const { userId } = req.body;
    const rooms = await Rooms.find({ participants: { $in: [userId] } });
    if (!rooms)
      return res
        .status(400)
        .json("You have not join any room. Create a new one");
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const GetAllRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();
    if (!rooms)
      return res
        .status(400)
        .json("You have not join any room. Create a new one");
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const LeaveRooms = async (req, res) => {
  try {
    const { userId, roomId } = req.body;
    const room_found = await Rooms.findOne({ _id: roomId });
    if (!room_found) return res.status(400).json("No such room exist");
    await Rooms.updateOne(
      { _id: roomId },
      {
        $pullAll: {
          participants: userId,
        },
      }
    );
    return res.status(201).json("Room successfully left");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// const DeleteRooms = async (req, res) => {
//   try {
//     const { roomId , userId } = req.body;
//     const room = Rooms.findOne({_id : roomId});
//     if(!room) return res.status(400).json("Room doesnt exists");
//     if(room.createdBy != userId) return res.status(400).json("You dont have acess to delete this room");

//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

module.exports = { createRooms, joinRooms, GetRoomsCreatedAndJoined,GetAllRooms };
