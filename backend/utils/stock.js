import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { AppError } from "./appError.js";
// import

export async function updateStock(order) {
  const { orderItems } = order;

  try {
    for (const product of orderItems) {
      const productId = product.product;

      const existingProduct = await Product.findById(productId);

      if (existingProduct.isPrint === false) {
        existingProduct.stockNumber -= product.quantity;
        await existingProduct.save();
        console.log("stock updated");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export const checkStock = asyncHandler(async (req, res, next) => {
  const { orderItems } = req.body;

  console.log(orderItems);
  try {
    for (const product of orderItems) {
      const productId = product._id;
      const quantity = product.quantity;
      console.log("this product ", product, ".  This quantity ", quantity);

      const existingProduct = await Product.findById(productId);
      console.log("existingProduct =============", existingProduct);

      if (existingProduct.isPrint === false) {
        const checkStockNumber = (existingProduct.stockNumber -=
          product.quantity);
        console.log(product.name, " checkStock number ", checkStockNumber);

        if (checkStockNumber < 0) {
          return next(new AppError("Product sold out", 400));
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  next();
});
