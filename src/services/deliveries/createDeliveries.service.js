const Boom = require("@hapi/boom");

const { deliveryOrderDb, userDb, userOrderDb } = require("../../dataAccess");

const {
  USER_TYPE: { delivery },
} = require("../../helpers/constants");

const createADelivery = async () => {
  //

  let deliveryPerson = await userDb.findOne({
    userType: delivery,
    orderAssigned: false,
  });

  console.log({ deliveryPerson });

  let userOrders = await userOrderDb.find({
    deliveryStatus: "SCHEDULED",
  });
  let currentDate = new Date();
  let day = currentDate.getDate();
  let deliveryDate = new Date(new Date().setDate(day + 3));
  const userDeliveriries = userOrders.map((order) => {
    let userDeliveriryObj = {
      user: deliveryPerson._id,
      product: order.product,
      userOrder: order._id,
      deliveryStatus: "ASSIGNED",
      deliveryDate: deliveryDate,
    };

    return userDeliveriryObj;
  });

  await deliveryOrderDb.insert(userDeliveriries);

  let promisedUserOrderStatuses = userOrders.map(async (order) => {
    return await userOrderDb.update(
      {
        _id: order._id,
      },
      {
        deliveryStatus: "PICKED",
      }
    );
  });

  let data = await Promise.all(promisedUserOrderStatuses);
  console.log({ data });
};

module.exports = createADelivery;
