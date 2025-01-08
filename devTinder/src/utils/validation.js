const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) throw new Error("name is not valid");
  else if (firstName.length < 4 || firstName.length > 15)
    throw new Error("name is not valid");
  else if (lastName.length < 4 || lastName.length > 15)
    throw new Error("name is not valid");
  else if (!validator.isEmail(emailId)) {
    throw new Error("email id is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong ");
  }
};

module.exports = { validateSignUpData };
