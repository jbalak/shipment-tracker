const express = require("express");

const userCtrl = require("../controllers/users.controllers");
const deliveryCtrl = require("../controllers/deliveries.controllers");
const ordersCtrl = require("../controllers/orders.controllers");
const makeExpressCallback = require("./expressCallback");
const { routes } = require("../app");
const router = express.Router();

router.get("/", makeExpressCallback(userCtrl.getAllUsers));
router.get("/:userId", makeExpressCallback(userCtrl.getAUser));
router.patch(
  "/:userId",
  makeExpressCallback(userCtrl.updateUserAvailibilityStatus)
);

// ORDERS ROUTE
router.get("/:userId/orders", makeExpressCallback(ordersCtrl.getAllOrders));
router.get(
  "/:userId/orders/:orderId",
  makeExpressCallback(ordersCtrl.getAOrder)
);
router.post("/:userId/orders", makeExpressCallback(ordersCtrl.createAOrder));

//DELIVERY ROUTES
router.get(
  "/:userId/deliveries",
  makeExpressCallback(deliveryCtrl.getAllDeliveries)
);
router.get(
  "/:userId/deliveries/:deliveryId",
  makeExpressCallback(deliveryCtrl.getADelivery)
);

router.patch(
  "/:userId/deliveries/:deliveryId/status",
  makeExpressCallback(deliveryCtrl.updateDeliveryStatus)
);

module.exports = router;
