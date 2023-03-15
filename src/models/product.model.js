const { Schema, model } = require("mongoose");

const addressSchema = new Schema(
  {
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    description: [{ type: String }],
    currency: { type: String, default: "INR", enum: ["INR", "USD"] },
    isAvailable: { type: Boolean, default: true },
    images: [{ type: String }],
    quantity: { type: Number, required: true },
    rating: { type: Number },
    ratingCount: { type: Number },
    address: addressSchema,
    metadata: {},
  },
  { timestamps: true }
);

const productModel = model("Product", productSchema);
module.exports = { Product: productModel };
