import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  Product: [],

  status: {
    type: String,
    default: "Unfulfilled",
  },

  userInfo: {
    type: Object,
  },

  orderTotal: {
    type: Number,
  },

  remarks: {
    type: Object,
  },

  time: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
