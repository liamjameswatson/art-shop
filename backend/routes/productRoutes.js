import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

// import { protect, protectAdmin } from "../middleware/authMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all products
// router.route("/").get(getProducts).post(protect, protectAdmin, createProduct);
router.route("/").get(getProducts).post(protect, createProduct);

// GET Single products
router
  .route("/:id")
  .get(getProductById)
  // .put(protect, protectAdmin, updateProduct);
  .put(protect, updateProduct)
  // .delete(protect, protectAdmin, deleteProduct);
  .delete(protect, deleteProduct);

export default router;
