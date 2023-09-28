import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productController.js";

// import { protect, admin } from "../middleware/authMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all products
// router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/").get(getProducts).post(protect, createProduct);

// GET Single products
router.route("/:id").get(getProductById);

export default router;
