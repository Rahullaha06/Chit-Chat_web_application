const Users = require("../models/Users");

const EditUserController = async (req, res) => {
  try {
    const { id, name, about, email, profilePicture } = req.body;

    const updatedUser = await Users.findOneAndUpdate(
      { id: id },
      {
        name: name,
        about: about,
        email: email,
        profilePicture: profilePicture,
      }
    );

    return res.status(201).json({
      message: "User updated Succesfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const GetDetailsOFUserController = async (req, res) => {
  try {
    const { id } = req.body;
    const User = await Users.findOne({ id: id });
    console.log(req.body);
    if (!User) return res.status(400).json("No user is present");
    return res.status(201).json(User);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { EditUserController, GetDetailsOFUserController };
