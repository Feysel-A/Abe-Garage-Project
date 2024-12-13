// import the express module
const express = require("express");

// call the router method from express to create the router
const router = express.Router();

// import the customer controller
const vehicleController = require("../controllers/vehicle.controller");

// create a route to handle the employee request in post
router.post("/api/vehicle", vehicleController.addVehicle);

// create a route to handle the employee request in get
router.get("/api/vehicle/customer", vehicleController.getVehicleById);

// create a route to handle the employee request in get
router.get(
  "/api/vehicle/single/:customer_hash",
  vehicleController.getSingleVehicle
);
// Route to update a customer's vehicle information
router.put("/update-vehicle/:vehicle_id", vehicleController.updateVehicle);

// export the router
module.exports = router;
