const { createRooms, joinRooms, GetRoomsCreatedAndJoined, GetAllRooms } = require("../controllers/roomController");

const router = require("express").Router();

router.post("/createroom", createRooms);
router.post("/joinroom", joinRooms);
router.post("/getrooms",GetRoomsCreatedAndJoined)
router.get("/getAllRooms",GetAllRooms)

module.exports = router;
