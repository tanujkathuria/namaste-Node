const express = require("express");
const connectDb = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const cors = require("cors");

// need for the whitelisting the origin domain name
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // this will act aas a middleware fr all the requests req. for the parsing of the json requests coming in the body
app.use(cookieParser());

app.use("/", authRouter); // router can be used as a middleware
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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

// app.use("/admin", adminAuth);
// app.use("/admin/data", (req, res) => {
//   res.send("all data sent through admin data");
// });

// app.get("/hello", (req, res) => {
//   console.log("hello 123 has been called", req.query);
//   res.send("hello 123 has been called");
// });

// app.get("/hello/:userid/:name", (req, res) => {
//   console.log("hello 123 has been called", req.params);
//   console.log("hello 123 has been called", req.query);
//   res.send("hello 123 has been called");
// });

// app.use("/test", (req, res) => {
//   res.send("hello from the  test server");
// });

console.log("starting a new project");
