const { Schema, model } = require("mongoose");
const USER_TYPE = ["customer", "delivery", "admin"];

const userSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    username: {
      type: String,
      unique: true,
      trim: true,
      lowerCase: true,
      required: true,
      index: true,
    },
    userType: { type: String, required: true, enum: USER_TYPE },
    password: { type: String, required: true },
    orderAssigned: { type: Boolean, default: false }, //flag for delivery user
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);
module.exports = { User: userModel };
