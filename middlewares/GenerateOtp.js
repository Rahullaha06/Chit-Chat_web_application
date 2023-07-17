const twilio = require("twilio");

const generateOtp = (otpLength) => {
  var digits = "0123456789";
  let OTP = "";
  for (var i = 0; i < otpLength; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const sendOTPToPhone = ({ message, contact }) => {
  try {
    const client = require("twilio")(
      process.env.ACCOUNT_SID,
      process.env.AUTH_TOKEN
    );

    client.messages
      .create({
        body: message,
        to: contact, // Text this number
        from: process.env.AUTH_PHONE, // From a valid Twilio number
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

const generateTokens = () => {
  return Math.random().toString(36).substring(2);
};

module.exports = { generateOtp, sendOTPToPhone, generateTokens };
