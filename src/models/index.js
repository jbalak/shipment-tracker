const { Product } = require("./product.model");
const { User } = require("./user.model");
const { DeliveryOrder } = require("./deliveryOrders.model");
const { UserOrder } = require("./userOrders.model");

module.exports = { Product, User, UserOrder, DeliveryOrder };
