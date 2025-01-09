var jwt = require("jsonwebtoken");
const User = require("../model/user");

const adminAuth = (req, res, next) => {
  console.log("admin auth is gettng called");
  const token = "xyzaa";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) next();
  else {
    res.status(401).send("user is unauthorized");
  }
};

const userAuth = async (req, res, next) => {
  try {
    // read the token from the request cookies
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("token is not valid");
    }
    // validate the token
    const decodedObj = await jwt.verify(token, "secretkey"); // this secret key will come from the env file in the future
    const { _id } = decodedObj;
    const user = await User.findOne({ _id: _id });
    console.log(user);
    req.user = user;
    if (!user) res.status(401).send("user is not found");
    else next();
  } catch (err) {
    res.status(401).send("error:: " + err.message);
  }
  // find the user
};

module.exports = {
  adminAuth,
  userAuth,
};

//mongodb+srv://tanujkathuriakathuria:GWGph8nRLK6d9fxN@developersworld.dtykzv9.mongodb.net/
