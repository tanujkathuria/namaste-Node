const express = require("express");
const UserModel = require("../model/user");
const { adminAuth, userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) res.send("user does not exist");
    res.send("profile successful " + user);
  } catch (err) {
    res.status(400).send("error has occured" + err);
  }
});

// update the profile
router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    // validate the profile of the user
    if (!validateEditProfileData(req)) {
      res.status(400).send("invalid profile data");
    }
    const user = req.user;
    Object.keys(req.body).forEach((field) => (user[field] = req.body[field])); // run for each of the keys
    await user.save();
    res.send("user data has been updated successfully");
    if (!user) res.send("user does not exist");
  } catch (err) {
    res.status(400).send("error has occured" + err);
  }
});

// write down the api fr the forgot password scenario

// fetch all the records from the database
router.get("/findAllUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});

    if (users.length == 0) {
      res.status(404).send("user is not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// delete api
router.delete("/user", async (req, res) => {
  const id = req.body.userId;
  const user = await UserModel.findByIdAndDelete(id);
  res.send("user has been deleted successfully ");
});

// get user by email
router.get("/user", async (req, res) => {
  const emailId = req.body.emailId;
  try {
    const users = await UserModel.find({ emailId: emailId });
    if (users.length == 0) {
      res.status(404).send("user is not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// update the data of the user patch command in the app
router.patch("/user/:userId", async (req, res) => {
  const id = req.params?.userId;
  console.log(id);
  const data = req.body;

  const ALLOWED_UPDATES = [
    "password",
    "photoUrl",
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "skills",
    "emailId",
  ];

  try {
    const isUpdateAllowed = Object.keys(data).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    if (!isUpdateAllowed) throw new Error("update is not allowed");
    const user = await UserModel.findByIdAndUpdate(id, data, {
      runValidators: true,
    });
    res.send("user has been updated successfully ");
  } catch (err) {
    res.status(400).send("update is not allowed " + err);
  }
});

module.exports = router;
