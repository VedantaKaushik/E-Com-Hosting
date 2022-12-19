import express from "express";

const router = express.Router();

// Search Routes
import { SearchFunc } from "../controllers/FeaturesController.js";
router.route("/search").get(SearchFunc);

// Adress Update
import { AdressUpdate } from "../controllers/FeaturesController.js";
router.route("/user/update").post(AdressUpdate);

// Write a Review
import { WriteAReview } from "../controllers/FeaturesController.js";
router.route("/features/review").post(WriteAReview);

// Get All Review
import { GetAllReview } from "../controllers/FeaturesController.js";
router.route("/product/reviews").get(GetAllReview);

// Get Product based on catagory
import { GetProductByCAtagory } from "../controllers/FeaturesController.js";
router.route("/products/catagory").get(GetProductByCAtagory);

export default router;
