const Boom = require("@hapi/boom");
const { deliveryOrderDb, userDb, userOrderDb } = require("../../dataAccess");
const { isDef } = require("../../helpers");

const updateDeliveryStatus = async ({ params, body }) => {
  const { deliveryId } = params;
  const { orderId, deliveryStatus } = body;
  let populate = [{ path: "user" }, { path: "product" }, { path: "userOrder" }];
  let options = { populate };

  const deliveryCall = deliveryOrderDb.update(
    {
      _id: deliveryId,
    },
    {
      deliveryStatus: deliveryStatus,
    }
  );
  const orderCall = userOrderDb.update(
    {
      _id: orderId,
    },
    { deliveryStatus: deliveryStatus }
  );

  const promise = [deliveryCall, orderCall].map(async (e) => await e);
  await Promise.all(promise);

  return "done";

  //
};

module.exports = updateDeliveryStatus;
