import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST /api/oders
// @access Private (Signed in Users Only)
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    deliveryAddress,
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
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      deliveryAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      deliveryPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc Get logged in user's orders
// @route GET /api/oders/myorders
// @access Private (Signed in Users Only)
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }); // match user to the logged in user
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
// @route PUT /api/oders/:id/pay
// @access Private/Admin (Admin Only)
const UpdateOrderToPaid = asyncHandler(async (req, res) => {
  // if order respond with paypal info and set order to paid
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      //comes from paypal
      id: req.params.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    // save the new payemnt order details
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    // no order found
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to delivered
// @route PUT /api/oders/:id/delivered
// @access Private/Admin (Admin Only)
const UpdateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc GET All Orders
// @route GET /api/oders/:id/deliver
// @access Private/ADMIN
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name"); // populate fro the user collection the id and name
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  UpdateOrderToDelivered,
  UpdateOrderToPaid,
  getOrders,
};
