import express from "express";

import {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  updateOrderToPaidPayPal,
  updateOrderToPaidCard,
  payWithStripe,
  updateOrderToDelivered,
  getOrders,
  editOrder,
} from "../controllers/orderContoller.js";

import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all orders, create an order
router
  .route("/")
  .get(protect, restrictTo("admin"), getOrders)
  .post(protect, addOrderItems);

// User can get their orders
router.route("/myorders").get(protect, getMyOrders);

// Get order by ID
router.route("/:id").get(protect, getOrderByID);

// Update order to paid
router.route("/:id/paypal").put(protect, updateOrderToPaidPayPal);
// router.route("/:id/paycard").put(protect, UpdateOrderToPaidCard);

// Update order to paid
router.route("/:id/stripe").post(protect, payWithStripe);
// router.route("/:id/paycard").put(protect, UpdateOrderToPaidCard);

//Update order to delivered
router.route("/:id/deliver").put(protect, updateOrderToDelivered);
// router.route("/:id/deliver").put(protect, protectAdmin, UpdateOrderToDelivered);

router.route("/pay").put(protect, editOrder);

export default router;
