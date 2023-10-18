import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import { AppError } from "../utils/appError.js";
import multer from "multer";
import sharp from "sharp";

const multerStorage = multer.memoryStorage();

const mutlerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image, please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: mutlerFilter,
});

export const uploadProductImage = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "otherImages", maxCount: 6 },
]);

export const resizeProductimages = asyncHandler(async (req, res, next) => {
  // console.log("body = ", req.body);
  // console.log("other Images = ", req.files.otherImages);

  if (!req.files.image || !req.files.otherImages) {
    return next();
  }

  console.log("req.files = ", req.files);

  // Main Image

  const imageFilename = `product-MainImg-${
    req.params.id
  }-${Date.now()}-image.jpeg`;

  await sharp(req.files.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/${imageFilename}`);

  req.body.image = `uploads/${imageFilename}`;

  req.body.otherImages = [];
  // console.log(req.body.otherImages);
  await Promise.all(
    req.files.otherImages.map(async (file, index) => {
      const filename = `${file.originalname}-${
        req.params.id
      }-${Date.now()}-image${index + 1}.jpeg`;
      console.log(index, " and  ", file);

      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`uploads/${filename}`);

      req.body.otherImages.push(filename);
      console.log("LISTR = ", req.body.otherImages);
    })
  );
  // console.log(req.body);
  next();
});

// @desc Fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
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
