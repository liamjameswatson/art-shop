import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST /api/oders
// @access Private (Signed in Users Only)
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAdrdress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    deliveryPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    // Nothing in the basket
    res.status(400);
    throw new Error("You need at least one item to make an order");
  } else {
    // create a new order with user ID
    const order = new Order({
      // product is a ref in orderModel - see orderModel. Need to map to get products
      orderItems: orderItems.map((order) => ({
        ...order, // for each order spread out the name, quantity, image, and price
        product: order._id, // product is this object's id
        id: undefined, // product is the id, so the id is undefined, don't need it.
        user: req.user_.id,
      })),
      shippingAdrdress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      deliveryPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc Get logged in user's orders
// @route GET /api/oders/myorders
// @access Private (Signed in Users Only)
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user_.id }); // match user to the logged in user
  res.status(200).json(orders);
});

// @desc Get order by ID
// @route Get /api/oders/:id
// @access Private (Signed in Users Only)
const getOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); // seearch the database for the id in url, and add user name and email

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
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
