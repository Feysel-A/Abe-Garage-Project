const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getsingleOrder,
  customerOrders,
  updateOrder
} = require("../controllers/order.controller");

// POST request to create a new order
router.post("/api/order", createOrder);
//GET request to get all orders
router.get("/api/orders", getAllOrders);
//GET request to get single order
router.get("/api/order/:hash", getsingleOrder);
//Get customer orders
router.get("/api/customer/orders/:hash", customerOrders);
//PUT request to update order details
router.put("/api/update-order", updateOrder);
module.exports = router;
