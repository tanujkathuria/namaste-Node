const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://tanujkathuriakathuria:GWGph8nRLK6d9fxN@developersworld.dtykzv9.mongodb.net/devTinder"
  );
};

module.exports = connectDb;
