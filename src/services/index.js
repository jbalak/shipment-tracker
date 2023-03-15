const deliverieServices = require("./deliveries");
const orderServices = require("./orders");
const authServices = require("./auth");
const userServices = require("./users");

module.exports = Object.freeze({
  authServices,
  deliverieServices,
  orderServices,
  userServices,
});
