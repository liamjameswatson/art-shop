// import { AppError } from "../utils/appError";
import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    cb(null, `${req.body.name}-${Date.now()}.${extension}`);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an Image", 400), false);
  }
}

const upload = multer({ storage: multerStorage, fileFilter: fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`,
    });
  });
});

export default router;

// export function resizeImage(req, res, next) {
//   console.log(req.file);
//   if (!req.file) return next();
//   console.log(req.body);
//   req.file.filename = `Photo-${Date.now()}.jpeg`;

//   sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`uploads/${req.file.filename}`);

//   console.log(req.file.buffer);

//   next();
// }

export function resizeImage(req, res, next) {
  console.log(req.file);
  if (!req.file) return next();
  console.log(req.body);
  req.file.filename = `Photo-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer((err, buffer) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error processing the image");
      }

      const base64ImageData = buffer.toString("base64");
      const dataUrl = `data:image/jpeg;base64,${base64ImageData}`;

      // Send the data URL as a response
      res.status(200).json({
        message: "Image uploaded and processed successfully",
        image: dataUrl,
      });
    });
}
