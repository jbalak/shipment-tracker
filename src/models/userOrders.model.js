const { Schema, model, Types } = require("mongoose");
const { ObjectId } = Types;

const userOrderSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    product: { type: ObjectId, ref: "Product", required: true },
    address: { type: String, required: true },
    contact: { type: String },
    deliveryNote: { type: String },
    quantity: { type: Number, default: 1 },
    deliveryStatus: {
      type: String,
      enum: ["SCHEDULED", "PICKED", "IN_TRANSIT", "DELIVERED"],
    },
  },
  { timestamps: true }
);

const userOrderModel = model("UserOrder", userOrderSchema);
module.exports = { UserOrder: userOrderModel };
