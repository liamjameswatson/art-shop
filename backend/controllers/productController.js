import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import { AppError } from "../utils/appError.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// @desc Fetch all products
// @route GET /api/products
// @access Public

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.json(products);
});

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 100;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments();

  const searchTerm = req.query.searchTerm
    ? { name: { $regex: req.query.searchTerm, $options: "i" } }
    : {};

  const products = await Product.find({ ...searchTerm })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch a single product
// @route GET /api/products:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(req.params.id);

  if (product) {
    // console.log(product);
    res.status(201).json({
      status: "success",
      product,
    });
  } else {
    // use errorHandler
    res.status(404);
    throw new Error("Product not found!");
  }
});

// @desc Create a product
// @route POST /api/products
// @access Private/ Admin
const createProduct = asyncHandler(async (req, res) => {
  console.log("req.body form request...", req.body);
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    otherImages: req.body.otherImages,
    category: req.body.category,
    price: req.body.price,
    stockNumber: req.body.stockNumber,
    user: req.user._id,
  });
  console.log("new product pre saved", newProduct);
  if (newProduct) {
    const createdProduct = await newProduct.save();
    console.log("new product after saved", createdProduct);

    res.status(201).json({
      status: "success",
      createdProduct,
    });
  } else {
    new AppError("Product could not be created", 500);
  }
});

// @desc Update a product
// @route GET /api/products/:id
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const updateData = req.body; // Expect an object with properties to update
  console.log("updateData =", updateData);

  const product = await Product.findById(req.params.id);

  if (product) {
    // Update only the properties that are provided in the request
    for (const key in updateData) {
      if (key in product) {
        product[key] = updateData[key];
      }
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc   Delete a products
// @route  DELETE /api/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    // if (product.image) {
    //   const imagePath = path.join(__dirname, "art-shop", product.image);
    //   console.log("image path", imagePath);

    //   try {
    //     await fs.promises.unlink(imagePath); // Use fs.promises.unlink for promises-based approach
    //     console.log("File deleted successfully");
    //   } catch (err) {
    //     console.log("Error deleting", err);
    //     res.status(500).json({ error: "Error deleting the image" });
    //     return;
    //   }
    // }
    await Product.deleteOne({ _id: product._id });
    console.log("product for delete successfully");
    res.status(200).json({ message: "Product removed successfully" });
  } else {
    console.log("not found");
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getAllProducts,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
