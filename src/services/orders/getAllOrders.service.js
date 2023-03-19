const { userOrderDb, productDb } = require("../../dataAccess");
const {
  isDef,
  getJWTToken,
  cryptPassword,
  comparePassword,
} = require("../../helpers");
const getAllOrders = async ({ params }) => {
  let { userId } = params;
  let sort = { createdAt: -1 };

  let orders = userOrderDb.find(
    {
      user: userId,
    },
    { sort }
  );
  return orders;
};

module.exports = getAllOrders;
