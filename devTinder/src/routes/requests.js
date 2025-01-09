const express = require("express");
const UserModel = require("../model/user");
const { adminAuth, userAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " send connection request");
});

module.exports = router;
