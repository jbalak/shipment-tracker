const { userDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");

const getAUser = async ({ params, query }) => {
  const { userId } = params;

  const user = await userDb.findOne({ _id: userId });

  if (!isDef(user)) {
    throw new Error("user not found");
  }

  return user;
};

module.exports = getAUser;
