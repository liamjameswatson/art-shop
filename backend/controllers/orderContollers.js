import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST /api/oders
// @access Private (Signed in Users Only)
const addOrderItems = asyncHandler(async (req, res) => {
  res.send("add order items");
});

// @desc Get logged in user's orders
// @route GET /api/oders/myorders
// @access Private (Signed in Users Only)
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("get my orders");
});

// @desc Get order by ID
// @route Get /api/oders/:id
// @access Private (Signed in Users Only)
const getOrderByID = asyncHandler(async (req, res) => {
  res.send("get order by ID");
});

// @desc Update order to paid
// @route Get /api/oders/:id/pay
// @access Private/Admin (Admin Only)
const UpdateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("order has been paid");
});

// @desc Update order to delivered
// @route Get /api/oders/:id/delivered
// @access Private/Admin (Admin Only)
const UpdateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("order has been paid");
});

// @desc GET All Orders
// @route GET /api/oders/:id/deliver
// @access Private/ADMIN
const getOrders = asyncHandler(async (req, res) => {
  res.send("all orders are here");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  UpdateOrderToDelivered,
  UpdateOrderToPaid,
  getOrders,
};
