const { userOrderDb, productDb } = require("../../dataAccess");

const {
  isDef,
  getJWTToken,
  cryptPassword,
  comparePassword,
} = require("../../helpers");
const getAOrder = async ({ params }) => {
  let { userId, orderId } = params;

  let order = userOrderDb.findOne({
    user: userId,
    _id: orderId,
  });
  return order;
};

module.exports = getAOrder;
