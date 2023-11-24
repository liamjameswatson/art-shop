import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";
// import { getAllProducts } from "./backend/controllers/productController.js";
import { response } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directoryToCheck = __dirname + "/uploads";

fs.readdir(directoryToCheck, (err, items) => {
  if (err) {
    console.error('Error reading "uploads" directory:', err);
    return;
  }

  // Loop through the list of items (files and directories) in "uploads"
  items.forEach((item) => {
   
  });
});

// async function allProducts() {
//   try {
//     const response = await getAllProducts();
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.error("Error getting products:", error);
//     throw error; // Rethrow the error if needed
//   }
// }

// allProducts();
