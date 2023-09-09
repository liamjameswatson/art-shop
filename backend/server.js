import express from "express";
import { products } from "./data/PlaeholderData";

const port = 5000;

const app = express();






app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
