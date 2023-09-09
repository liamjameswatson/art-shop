import express from "express";
import { products } from "./data/PlaeholderData";

const port = 5000;

const app = express();


app.get("/", (req, res) => {
  res.send("API is running...");
});

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
