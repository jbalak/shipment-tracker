const { Schema, model, Types } = require("mongoose");
const { ObjectId } = Types;

const deliveryOrdersSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    product: { type: ObjectId, ref: "Product", required: true },
    userOrder: { type: ObjectId, ref: "UserOrder", required: true },
    deliveryStatus: {
      type: String,
      enum: ["ASSIGNED", "IN_TRANSIT", "DELIVERED"],
    },
    deliveryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const deliveryModel = model("DeliveryOrder", deliveryOrdersSchema);
module.exports = { DeliveryOrder: deliveryModel };
