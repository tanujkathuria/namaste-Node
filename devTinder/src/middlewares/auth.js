const adminAuth = (req, res, next) => {
  console.log("admin auth is gettng called");
  const token = "xyzaa";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) next();
  else {
    res.status(401).send("user is unauthorized");
  }
};

module.exports = {
  adminAuth,
};

//mongodb+srv://tanujkathuriakathuria:GWGph8nRLK6d9fxN@developersworld.dtykzv9.mongodb.net/
