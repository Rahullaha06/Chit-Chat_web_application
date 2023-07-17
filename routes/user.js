const {
  EditUserController,
  GetDetailsOFUserController,
} = require("../controllers/usercontroller");

const router = require("express").Router();

router.post("/update", EditUserController);
router.post("/getdetails", GetDetailsOFUserController);

module.exports = router;
