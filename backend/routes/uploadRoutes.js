import path from "path";
import express from "express";
import multer from "multer";
import sharp from "sharp";
import asyncHandler from "../middleware/asyncHandler.js";
import fileNameProvider from "../utils/fileNameProvider.js";

import { AppError } from "../utils/appError.js";

const router = express.Router();

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

// export const uploadProductImage = upload.fields([
//   { name: "image", maxCount: 1 },
//   { name: "otherImages", maxCount: 6 },
// ]);

export const resizeOneImage = asyncHandler(async (req, res, next) => {
  console.log("RESIZING");

  if (!req.file) {
    return next();
  }

  const imageFilename = `${fileNameProvider(
    req.file.originalname
  )}-MainImg-$-${Date.now()}-image.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/${imageFilename}`);

  req.body.image = `uploads/${imageFilename}`;
  next();
});

router.post("/", upload.single("image"), resizeOneImage, (req, res) => {
  console.log(req.file);
  res.send({
    message: "Image Uploaded Successfully",
    image: `/${req.file.path}`,
    image: `/${req.body.image}`,
  });
});

export default router;

// export const resizeProductimages = asyncHandler(async (req, res, next) => {
//   console.log("RESIZING");

//   if (!req.files.image || !req.files.otherImages) {
//     return next();
//   }

//   const imageFilename = `product-MainImg-${
//     req.params.id
//   }-${Date.now()}-image.jpeg`;

//   await sharp(req.files.image[0].buffer)
//     .resize(2000, 1333)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`uploads/${imageFilename}`);

//   req.body.image = `uploads/${imageFilename}`;

//   req.body.otherImages = [];
//   // console.log(req.body.otherImages);
//   await Promise.all(
//     req.files.otherImages.map(async (file, index) => {
//       const filename = `${file.originalname}-${
//         req.params.id
//       }-${Date.now()}-image${index + 1}.jpeg`;
//       console.log(index, " and  ", file);

//       await sharp(file.buffer)
//         .resize(500, 500)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`uploads/${filename}`);

//       req.body.otherImages.push(filename);
//       console.log("LISTR = ", req.body.otherImages);
//     })
//   );
// });
