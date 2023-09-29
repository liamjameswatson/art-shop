import path from "path";
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
  // console.log("User info:", req);
  next();
};

// Use the logUserInfo middleware before the protected routes
app.use(logUserInfo);

// Get initial route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); //Set __dirname to current directory

app.use("uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
