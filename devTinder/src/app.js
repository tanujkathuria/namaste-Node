const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDb = require("./config/database");
const app = express();
const UserModel = require("./model/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");

connectDb()
  .then(() => {
    console.log("db connection is established ");
    app.listen(3000, () => {
      console.log("server is successfully running on port 3000");
    });
  })
  .catch(() => {
    console.log("db connection is not established ");
  });

app.use(express.json()); // this will act aas a middleware fr all the requests req. for the parsing of the json requests coming in the body
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validation of the data  throw an error in case data is not correct
    validateSignUpData(req);
    // encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    // 10 rounds of hashing used
    const passwordHsh = await bcrypt.hash(password, 10);
    console.log(passwordHsh);
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

// update the data of the user patch command in the app
app.patch("/user/:userId", async (req, res) => {
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

// get user by email
app.get("/user", async (req, res) => {
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

// delete api
app.delete("/user", async (req, res) => {
  const id = req.body.userId;
  const user = await UserModel.findByIdAndDelete(id);
  res.send("user has been deleted successfully ");
});

// fetch all the records from the database
app.get("/feed", async (req, res) => {
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

// request handler function
// tis will match all the http methods
// app.use("/hello", (req, res) => {
//   res.send("hello from the server");
// });

// ? is optional
// + is required for multiple add as many chars as you want to
// app.get("/hell?o123", (req, res) => {
//   console.log("hello 123 ahs been called");
//   res.send("hello 123 has been called");
// });

app.use("/admin", adminAuth);
app.use("/admin/data", (req, res) => {
  res.send("all data sent through admin data");
});

app.use(
  "/user",
  (req, res, next) => {
    // route handler
    console.log("handling the route user");
    next();
    res.send("Response!!");
  },
  (req, res) => {
    // route handler2
    console.log("handling the route user2");
    res.send("2 response");
  }
);

app.get("/hello", (req, res) => {
  console.log("hello 123 has been called", req.query);
  res.send("hello 123 has been called");
});

app.get("/hello/:userid/:name", (req, res) => {
  console.log("hello 123 has been called", req.params);
  console.log("hello 123 has been called", req.query);
  res.send("hello 123 has been called");
});

app.use("/test", (req, res) => {
  res.send("hello from the  test server");
});

console.log("starting a new project");

// login using bcrypt and comparing it with the hashed password
app.post("/login", async (req, res) => {
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
      res.send("login is successful");
    } else throw new Error("invalid credentials");
  } catch (err) {
    res.status(400).send("error has occured" + err);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) res.send("user does not exist");
    res.send("profile successful " + user);
  } catch (err) {
    res.status(400).send("error has occured" + err);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " send connection request");
});
