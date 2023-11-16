import path from "path";
import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

// import stripeModule from "stripe";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import stripe from "./routes/stripe.js";

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
app.use("/api/stripe", stripe);

// server.js
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

///////////////////////////////////////////////////////////////////////////

// const stripe = stripeModule(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2022-08-01",
// });

// app.get("/api/config/stripe", (req, res) => {
//   res.send({
//     publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
//   });
// });

// app.post("/api/create-payment-intent", async (req, res) => {
//   console.log(process.env.STRIPE_PUBLISHABLE_KEY);
//   console.log(process.env.STRIPE_SECRET_KEY);
//   console.log("creating intent..............");
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       currency: "gbp",
//       amount: 1999, //place order amount here.
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });
//     res.send({ clientSecret: paymentIntent.client_secret });
//   } catch (e) {
//     console.log("creating intent");
//     return res.status(400).send({
//       error: {
//         message: e.message,
//       },
//     });
//   }
// });
//////////////////////////////////////////////////////////////////////////////////

const __dirname = path.resolve(); //Set __dirname to current directory

// app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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
