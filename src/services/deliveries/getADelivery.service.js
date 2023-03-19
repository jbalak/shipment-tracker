const Boom = require("@hapi/boom");
const { deliveryOrderDb, userDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");

const getADelivery = async ({ params, body }) => {
  const { userId } = params;

  let user = await userDb.findOne({ _id: userId });

  if (!isDef(user)) {
    throw Boom.badRequest("user not found");
  }
  const options = {
    populate: [{ path: "user" }, { path: "product" }, { path: "userOrder" }],
  };
  let delivery = await deliveryOrderDb.findOne({ user: userId }, options);

  return delivery;
};

module.exports = getADelivery;
