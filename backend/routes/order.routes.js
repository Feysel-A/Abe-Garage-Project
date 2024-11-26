const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getsingleOrder,
} = require("../controllers/order.controller");

// POST request to create a new order
router.post("/api/order", createOrder);
//GET request to get all orders
router.get("/api/orders", getAllOrders);
//GET request to get single order
router.get("/api/order/:hash", getsingleOrder);
module.exports = router;
