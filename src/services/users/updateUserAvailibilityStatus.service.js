const { deliveryOrderDb, userDb } = require("../../dataAccess");
const Boom = require("@hapi/boom");
const { isDef } = require("../../helpers");

const updateUserAvailibilityStatus = async ({ params, query }) => {
  const { userId } = params;

  const user = await userDb.findOne({ _id: userId });
  if (!isDef(user)) {
    throw new Error("post not found");
  }

  //check pending deliveries

  let isDeliveryExist = await deliveryOrderDb.findOne({
    user: userId,
    deliveryStatus: { $ne: "DELIVERED" },
  });
  if (isDef(isDeliveryExist)) {
    Boom.badRequest("deliveries are pending");
  }

  // free a delivery user after all deliveries completed
  await userDb.update(
    {
      _id: userId,
    },
    { orderAssigned: false }
  );

  return user;
};

module.exports = updateUserAvailibilityStatus;
