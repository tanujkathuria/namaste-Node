const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["accepted", "rejected", "ignore", "interested"],
        message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
      },
    },
  },
  {
    timestamps: true,
  }
);

// if we do connectionrequest.find({fromUserId: 1323232})
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); // it can be 1 or -1 for ascending and descending order

connectionRequestSchema.pre("save", function (next) {
  console.log("pre method has been called before save");
  const connectionRequest = this;
  // check if the from user id is same as to user id
  if (this.fromUserId.equals(this.toUserId))
    throw new Error("cannot send the connection request to yourself ");
  next();
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
