const mongoose = require("mongoose");
const validator = require("validator");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50, // either set it as unique or set index=true for creating the index for the find and search
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true, // automatically creates index for the same if the column is unique
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is not valid boss");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data is not valid ");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "This is a default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// REUSABLE functions based on the schema
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "secretkey", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
