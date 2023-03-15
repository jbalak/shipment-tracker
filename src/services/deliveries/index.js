const getAllDeliveries = require("./getAllDeliveries.service");
const getADelivery = require("./getADelivery.service");
const createADelivery = require("./createDeliveries.service");
const updateDeliveryStatus = require("./updateDeliveryStatus.service");
module.exports = Object.freeze({
  getAllDeliveries,
  getADelivery,
  createADelivery,
  updateDeliveryStatus,
});
