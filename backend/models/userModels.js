import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  products: [],

  review: [
    {
      products: [],

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

  userAdress: {
    AdressLine: "",
    city: "",
    phone: "",
    state: "",
    zipCode: "",
    country: "",
  },

  phoneNo: {
    type: Number,
  },

  gender: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
