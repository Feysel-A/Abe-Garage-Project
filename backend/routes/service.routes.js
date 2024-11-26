// routes/commonServiceRoutes.js
const express = require("express");
const { addServiceHandler, getServicesHandler, getServiceByIdHandler,updateServiceHandler,deleteServiceHandler } = require("../controllers/service.controller");

const router = express.Router();
// Define routes for common services
//POST request to add a new service
router.post("/api/add-services", addServiceHandler); // Add a service
//Get request to get all services
router.get("/api/services", getServicesHandler); // Get all services
//GET requset to get single service
router.get("/api/service/:id", getServiceByIdHandler);
//PUT request to update service details
router.put("/api/update-service/:id", updateServiceHandler);
//DELETE request to delete a service
router.delete("/api/delete-service/:id", deleteServiceHandler);
module.exports = router;
