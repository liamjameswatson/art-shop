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

export const resizeOneImage = asyncHandler(async (req, res, next) => {
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
  res.json({
    status: "success",
    message: "Image Uploaded Successfully",
    path: `/${req.file.path}`,
    image: `/${req.body.image}`,
  });
});

export const resizeMultiImages = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  const otherImages = [];
  await Promise.all(
    req.files.map(async (file, index) => {
      const imageFilename = `${
        file.originalname
      }-otherImage-$-${Date.now()}-image.jpeg`;

      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`uploads/${imageFilename}`);

      otherImages.push(`uploads/${imageFilename}`);

      req.body.images = otherImages;
    })
  );
  next();
});

router.post(
  "/multi",
  upload.array("otherImages", 6),
  resizeMultiImages,
  (req, res) => {
    res.send({
      message: "Images Uploaded Successfully",
      images: req.body.images,
    });
  }
);

export default router;
