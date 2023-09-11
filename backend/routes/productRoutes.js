import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

// GET all products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
    console.log(products);
  })
);

// GET Single products
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      // use errorHandler
      res.status(404);
      throw new Error("Resource not found!");
    }
  })
);

export default router;
