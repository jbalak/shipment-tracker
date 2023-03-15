const { deliverieServices } = require("../services");

module.exports = Object.freeze({
  getADelivery: deliverieServices.getADelivery,
  getAllDeliveries: deliverieServices.getAllDeliveries,
  updateDeliveryStatus: deliverieServices.updateDeliveryStatus,
});
