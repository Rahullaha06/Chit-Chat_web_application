const {
  registerControllerUsingPhone,
  verifyOtp,
  LogIn,
} = require("../controllers/registerController");

const router = require("express").Router();

router.post("/phone", registerControllerUsingPhone);
router.post("/check-otp", verifyOtp);
router.post("/login", LogIn);

module.exports = router;
