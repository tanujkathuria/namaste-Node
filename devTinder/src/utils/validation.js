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

const validateEditProfileData = (req) => {
  console.log("validate edit profile data as been caled");
  const ALLOWED_EDIT_FIELDS = [
    "photoUrl",
    "about",
    "age",
    "gender",
    "skills",
    "firstName",
    "lastName",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) => {
    const allowedField = ALLOWED_EDIT_FIELDS.includes(field);
    return allowedField;
  });
  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
