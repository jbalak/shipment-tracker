const { userOrderDb, productDb } = require("../../dataAccess");

const {
  isDef,
  getJWTToken,
  cryptPassword,
  comparePassword,
} = require("../../helpers");
const getAOrder = async ({ params }) => {
  let { userId, orderId } = params;
  const options = {
    populate: [{ path: "user" }, { path: "product" }],
  };
  let order = userOrderDb.findOne(
    {
      user: userId,
      _id: orderId,
    },
    options
  );
  return order;
};

module.exports = getAOrder;
