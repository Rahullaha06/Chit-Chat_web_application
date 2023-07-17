const bcrypt = require("bcrypt");
const {
  generateOtp,
  sendOTPToPhone,
  generateTokens,
} = require("../middlewares/GenerateOtp");
const Users = require("../models/Users");

const registerControllerUsingPhone = async (req, res) => {
  try {
    console.log(req.body);
    const phoneNumber = req.body.phoneNumber;
    const phoneExist = await Users.findOne({ phoneNumber : phoneNumber });

    // Check if phone Number exist already

    if (phoneExist) {
      return res.status(403).json("Phone Number already exists.");
    }

    const newUser = new Users({
      id: Date.now(),
      phoneNumber: phoneNumber,
      name : ""
    });
    const user = await newUser.save();
    res.status(201).json({
      message: "OTP sent succesfully",
      data: newUser,
    });
    const otp = generateOtp(6);
    user.phoneOtp = otp;
    await user.save();

    sendOTPToPhone({
      message: `Your OTP is ${otp}.Please don't share withanyone`,
      contact: phoneNumber,
    });
    return res.status(201);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

//  Check OTP from mobile

const verifyOtp = async (req, res) => {
  try {
    const { otp, id } = req.body;
    const getUserToVerify = await Users.findOne({ id: id });
    if (!getUserToVerify) return res.status(400).json("User doesnt exists");
    if (getUserToVerify.phoneOtp === otp && !getUserToVerify.verifiedUser) {
      getUserToVerify.verifiedUser = true;
      await getUserToVerify.save();
      return res.status(201).json("Welcome to our App");
    } else {
      return res.status(400).json("Otp doesnt match");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// LogIn With Phone

const LogIn = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const phoneExist = await Users.findOne({ phoneNumber: phoneNumber });

    // Check if phone Number doesnt exits

    if (!phoneExist) {
      return res.status(403).json("Phone Number doesnt exists.");
    }

    if (!phoneExist.verifiedUser)
      return res.status(403).json("User not verified to log in");
    const ultimatetoken =
      generateTokens() + generateTokens() + generateTokens() + generateTokens();

    return res.status(201).json({
      message: "SuccesFully Logged In",
      data: phoneExist,
      token: ultimatetoken,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const registerUsingEmail = async (req, res) => {
  const email = req.body.email;
  const EmailExist = await Users.findOne({ email });
  if (EmailExist)
    return res.status(400).json("Email Already Exists.Try Sign In");
};

module.exports = { registerControllerUsingPhone, verifyOtp, LogIn };
