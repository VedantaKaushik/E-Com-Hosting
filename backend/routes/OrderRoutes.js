import express from "express";

const router = express.Router();

import {
  createAOrder,
  trackOrder,
  getAllOrders,
  getAOrder,
  updateAOrder,
  FilterOrder,
} from "../controllers/OrderController.js";

// Placing A Order
router.route("/order/create").post(createAOrder);

// Tracking A Order
router.route("/order/track").post(trackOrder);

// get All Order
router.route("/orders").get(getAllOrders);

// Get a Order
router.route("/order").get(getAOrder);

// Update a Order
router.route("/update/order").post(updateAOrder);

// Filter Order
router.route("/order/filter").get(FilterOrder);

export default router;
