const express = require("express");
const UserModel = require("../model/user");
const { adminAuth, userAuth } = require("../middlewares/auth");
const { ConnectionRequestModel } = require("../model/connectionRequest");

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    // check if the from user id and touser id is same or not
    if (fromUserId == toUserId) return res.status(400).send("invalid user id");

    // allowed status
    const allowedStatus = ["ignore", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).send("invalid status type" + status);
    }
    // check if the to userid is the existing id
    const toUser = await UserModel.findOne({ _id: toUserId });
    console.log(toUser);
    if (!toUser) return res.status(400).send("invalid user");
    // userid can be invalid
    // toConnection cannot send it back
    // if already present then should not be added again or if the other person has already sent the request then should not be sent
    const isExistingRequest = await ConnectionRequestModel.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });
    if (isExistingRequest)
      return res.status(400).send("connection request already present");

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionRequest.save();
    res.json({ message: "connectoon request sent successfully ", data });
  } catch (err) {
    res.status(400).send("some error has occured" + err);
  }
});

module.exports = router;
