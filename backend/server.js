import express from "express";
import dotenv from "dotenv";
dotenv.config()
import { products } from "./data/placeholderData.js";

const port = process.env.PORT || 5000;

const app = express();

// Get initial route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET Single products
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
