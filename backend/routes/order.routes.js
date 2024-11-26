const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController');

// POST request to create a new order 
router.post('/api/order', createOrder);

module.exports = router;
