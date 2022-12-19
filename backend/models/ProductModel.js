import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  catagory: {
    type: String,
  },

  images: {},

  quantity: {
    type: Number,
    default: 1,
  },

  variant: [],

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  review: [
    {
      user: {
        type: Object,
      },

      revDesc: {
        type: String,
      },

      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },

      Date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
