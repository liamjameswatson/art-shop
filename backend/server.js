import path, { dirname } from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import globalErrorHandler from "./controllers/errorController.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 8000;

connectDB(); // connect to database

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", //  frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Required for sending cookies in cross-origin requests
};

app.use(cors(corsOptions));

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware - allows access of req.cookies
app.use(cookieParser());

// Create a middleware function to log req.user
const logUserInfo = (req, res, next) => {
  req.requestTime = new Date().toDateString();
  // console.log("cookie", req.cookies);
  // console.log("user", req.user);
  next();
};

// Use the logUserInfo middleware before the protected routes
app.use(logUserInfo);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); //Set __dirname to current directory

app.use("uploads", express.static(path.join(__dirname, "/uploads")));

// If in production
if (process.env.NODE_ENV === "production") {
  // all routes got into the build,  set static folder
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // any route that is not '/api/...' (as above) will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  // if in development mode, use the react dev server
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}
app.use(globalErrorHandler);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(process.env.NODE_ENV);
  console.log(`Server running on port ${port}`);
});
