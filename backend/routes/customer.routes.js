const express = require("express");
const {
  addCustomer,
  getAllCustomers,
  getSingleCustomerByHash,
  updateCustomer
} = require("../controllers/customer.controller");
const router = express.Router();
//A POST request to add a new customer
router.post("/api/add-customer", addCustomer);
// GET all customers endpoint (protected for admin users)
router.get('/api/all-customers', getAllCustomers);
// Route to get a single customer by hash
router.get('/api/customer/:hash',getSingleCustomerByHash);
// Route to update customer information
router.put('/update-customer/:hash', updateCustomer);
module.exports = router;
