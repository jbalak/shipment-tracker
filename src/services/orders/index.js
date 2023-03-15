const getAllOrders = require("./getAllOrders.service");
const getAOrder = require("./getAOrder.service");
const createAOrder = require("./createAOrder.service");

module.exports = Object.freeze({
  getAllOrders,
  getAOrder,
  createAOrder,
});
