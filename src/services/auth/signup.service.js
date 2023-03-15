const { userDb } = require("../../dataAccess");
const { isDef, cryptPassword, isPasswordSecure } = require("../../helpers");
const { USER_TYPE } = require("../../helpers/constants");
const signup = async ({ body, headers }) => {
  const { name, username, password, newPassword, userType, profile } = body;

  if (!isDef(name)) {
    throw new Error("name is required");
  }

  if (!isDef(username)) {
    throw new Error("username is required");
  } else if (username.trim().includes(" ")) {
    throw new Error("no space is allowd in username");
  }

  if (!isDef(password)) {
    throw new Error("password is required");
  }

  if (!isDef(newPassword)) {
    throw new Error("newPassword is required");
  }

  if (!isPasswordSecure(password)) {
    throw new Error("more secure password required");
  }

  if (password != newPassword) {
    throw new Error("password and reentered password should match");
  }

  //check user already exists
  let dbUser = await userDb.findOne({
    username: username,
  });

  if (isDef(dbUser)) {
    throw new Error("user already exists with this username");
  }

  let encryptedPassword = await cryptPassword(password);
  const userObject = {
    name,
    username,
    password: encryptedPassword,
    userType,
  };

  const savedUser = await userDb.insert(userObject);

  return savedUser;
};

module.exports = signup;
