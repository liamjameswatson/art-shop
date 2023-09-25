import express from "express";

import {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  UpdateOrderToPaid,
  UpdateOrderToDelivered,
  getOrders,
} from "../controllers/orderContollers.js";

import { protect, protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all orders, create an order
router
  .route("/")
  .get(protect, protectAdmin, getOrders)
  .post(protect, addOrderItems);

// User can get their orders
router.route("/mine").get(protect, getMyOrders);

// Get order by ID
router.route("/:id").get(protect, getOrderByID);

// Update order to paid
router.route("/:id/pay").put(protect, UpdateOrderToPaid);

//Update order to delivered
router
  .route("/:id/delivered")
  .put(protect, protectAdmin, UpdateOrderToDelivered);

export default router;
