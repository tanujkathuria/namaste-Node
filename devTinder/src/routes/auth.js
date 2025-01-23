const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { validateSignUpData } = require("../utils/validation");
const UserModel = require("../model/user");
// const app = express()
const router = express.Router();
// similar to app.get and app.post

router.post("/signup", async (req, res) => {
  try {
    // validation of the data  throw an error in case data is not correct
    validateSignUpData(req);
    // encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    // 10 rounds of hashing used
    const passwordHsh = await bcrypt.hash(password, 10);
    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: passwordHsh,
    });
    await user.save();
    res.send("user added successfully ");
  } catch (err) {
    res.status(400).send("something went wrong" + err);
  }
});

// login using bcrypt and comparing it with the hashed password
router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) throw new Error("invalid credentials");
    const user = await UserModel.findOne({ emailId: emailId });
    if (!user) throw new Error("invalid credentials");
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // create a token based on the user id
      const token = await user.getJWT();
      // add the token to cookie and send the response back to the user
      res.cookie("token", token);
      res.send(user);
    } else throw new Error("invalid credentials");
  } catch (err) {
    res.status(400).send("error has occured" + err);
  }
});

// let the user log out even he is not logged in
// sending the null back in the token which expires just now
router.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("user has logged out now");
});

module.exports = router;
