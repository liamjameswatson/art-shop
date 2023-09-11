// A script to import all the data into the database

import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import { users } from "./data/users.js";
import { products } from "./data/products.js";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany(); // delete all
    await Product.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id; // the first user created is admin

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; // an object with all the properties of the product and the admin user
    });

    await Product.insertMany(sampleProducts); // insert all the sample products

    console.log("Data Imported".green.inverse);
    process.exit(); // exit the program without killing the process, don't pass a 1 in....
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany(); // delete all
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

// type in terminal to import or destroy data

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

// console.log(process.argv);
