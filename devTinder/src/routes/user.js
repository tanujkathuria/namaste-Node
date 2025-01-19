const express = require("express");
const ConnectionRequestModel = require("../model/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();
const UserModel = require("../model/user");

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

// feed api
router.get("/feed", userAuth, async (req, res) => {
  try {
    // should not see your own card
    // should not see the interested or accepted or rejcted users
    // should not see the connections
    // should not see the users who have sent the request
    // already sent the connection request to someone
    const user = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!user) {
      res.status(400).send("invalid user");
    }
    // find all the connection requests which i have sent or received
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        {
          toUserId: user._id,
        },
        {
          fromUserId: user._id,
        },
      ],
    }).select("fromUserId toUserId");
    // find the list of blocked users
    const blockUsersFromFeed = new Set();
    connectionRequests.forEach((connection) => {
      if (connection.fromUserId.equals(user._id)) {
        blockUsersFromFeed.add(connection.toUserId.toString());
      } else {
        blockUsersFromFeed.add(connection.fromUserId.toString());
      }
    });
    blockUsersFromFeed.add(user._id.toString());
    const users = await UserModel.find({
      _id: {
        $nin: Array.from(blockUsersFromFeed),
      },
    })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ users });

    // get the user ids of the users who have sent the request to me
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
