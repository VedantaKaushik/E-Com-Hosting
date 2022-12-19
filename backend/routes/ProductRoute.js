import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// Creating A Product (Admin)
import { CreateAProduct } from "../controllers/ProductController.js";
router.route("/create/product").post(CreateAProduct);

// Deleting A Product (Admin)
import { DeleteAProduct } from "../controllers/ProductController.js";
router.route("/product/delete").delete(DeleteAProduct);

// Updating a Product (Admin)
import {
  UpdateQuantity,
  UpdatePrice,
  UpdateTitleDesc,
  UpdateImages,
} from "../controllers/ProductController.js";

// Quantity
router.route("/product/update/quantity").post(UpdateQuantity);

// Title And Desc
router.route("/product/update/td").post(UpdateTitleDesc);
// Price
router.route("/product/update/Price").post(UpdatePrice);
// Images
router.route("/product/update/images").post(UpdateImages);

// Getting All Product
import { GetAllProduct } from "../controllers/ProductController.js";
router.route("/products").get(GetAllProduct);

// Get a Single Product
import { GetAProduct } from "../controllers/ProductController.js";
router.route("/product").get(GetAProduct);

export default router;
