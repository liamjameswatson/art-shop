import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import { AppError } from "../utils/appError.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public

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

  if (product) {
    // console.log(product);
    return res.json(product);
  } else {
    // use errorHandler
    res.status(404);
    throw new Error("Resource not found!");
  }
});

// @desc Create a product
// @route POST /api/products
// @access Private/ Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    description: "Sample description",
    image: "/images/sample.jpg",
    otherImages: ["/images/sample.jpg", "/images/sample.jpg"],
    category: "sample category",
    price: 0,
    stockNumber: 0,
    user: req.user._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update a product
// @route GET /api/products/:id
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const updateData = req.body; // Expect an object with properties to update

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
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product removed successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
