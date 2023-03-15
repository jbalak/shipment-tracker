const { orderServices } = require("../services");

module.exports = Object.freeze({
  getAOrder: orderServices.getAOrder,
  getAllOrders: orderServices.getAllOrders,
  createAOrder: orderServices.createAOrder,
});
