const Boom = require("@hapi/boom");
const { deliveryOrderDb, userDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");

const getADeliveries = async ({ params, body }) => {
  const { userId } = params;

  let user = await userDb.findOne({ _id: userId });

  if (!isDef(user)) {
    throw Boom.badRequest("user not found");
  }

  let deliveries = await deliveryOrderDb.find({ user: userId });

  return deliveries;
};

module.exports = getADeliveries;
