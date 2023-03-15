const { productDb, userOrderDb, userDb } = require("../../dataAccess");
const Boom = require("@hapi/boom");
const { isDef } = require("../../helpers");
const createAOrder = async ({ body, params }) => {
  let { userId } = params;
  let { productId, quantity, address, contact } = body;
  let userQuery = { _id: userId };
  let user = await userDb.find(userQuery);

  let product = await productDb.findOne({ _id: productId, isAvailable: true });

  if (!isDef(product)) {
    throw Boom.badRequest("Product not found");
  }
  if (product.quantity < quantity) {
    throw Boom.badRequest(`You can not order ${quantity} at the moment`);
  }

  let userOrder = {
    user: userId,
    product: productId,
    address,
    contact,
    quantity,
    deliveryStatus: "SCHEDULED",
  };
  let savedOrder = await userOrderDb.insert(userOrder);
  let isAvailable = true;
  if (product.quantity - quantity == 0) {
    isAvailable = false;
  }
  let availableProducts = await productDb.update(
    { _id: productId },
    { quantity: product.quantity - quantity, isAvailable }
  );

  return { user, product, savedOrder, availableProducts };
};

module.exports = createAOrder;
