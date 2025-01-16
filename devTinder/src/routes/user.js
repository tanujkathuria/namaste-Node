const express = require("express");
const ConnectionRequestModel = require("../model/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();

// find all the connection requests for the user
router.get("/user/requests", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(400).send("invalid user");
    }
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "emailId", "photoUrl"]);

    res.json({ connections: connectionRequests });
  } catch (e) {
    console.log(e);
  }
});

// find all the connections accepted for the user
router.get("/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(400).send("invalid user");
    }
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        {
          toUserId: user._id,
          status: "accepted",
        },
        {
          fromUserId: user._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", ["firstName", "lastName", "emailId", "photoUrl"])
      .populate("toUserId", ["firstName", "lastName", "emailId", "photoUrl"]);

    res.json({ connections: connectionRequests });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
