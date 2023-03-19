// /use-cases/todos/index.js

const getAllUsers = require("./getAllUsers.service");
const getAUser = require("./getAUser.service");
const updateUserAvailibilityStatus = require("./updateUserAvailibilityStatus.service");
module.exports = Object.freeze({
  getAllUsers,
  getAUser,
  updateUserAvailibilityStatus,
});
