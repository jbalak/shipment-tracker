const Boom = require("@hapi/boom");
const { deliveryOrderDb, userDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");

const getADelivery = async ({ params, body }) => {
  const { userId } = params;

  let user = await userDb.findOne({ _id: userId });

  if (!isDef(user)) {
    throw Boom.badRequest("user not found");
  }

  let delivery = await deliveryOrderDb.findOne({ user: userId });

  return delivery;
};

module.exports = getADelivery;
