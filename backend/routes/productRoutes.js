import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  resizeProductimages,
} from "../controllers/productController.js";

// import { protect, protectAdmin } from "../middleware/authMiddleware.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all products
// router.route("/").get(getProducts).post(protect, protectAdmin, createProduct);
router
  .route("/")
  .get(getProducts)
  .post(protect, restrictTo("admin"), createProduct);

// GET Single products
router
  .route("/:id")
  .get(getProductById)
  // .put(protect, protectAdmin, updateProduct);
  .put(protect, restrictTo("admin"), updateProduct)
  // .delete(protect, protectAdmin, deleteProduct);
  .delete(protect, deleteProduct);

export default router;
