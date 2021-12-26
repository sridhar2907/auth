const{ createUser,updateUsers}=require("./device.controller.js");
const authorize = require('_middleware/authorize')
const router= require("express").Router();
router.post("/",authorize('device'), createUser);
router.patch("/updatedevice",authorize('updatedevice'), updateUsers);

module.exports = router;