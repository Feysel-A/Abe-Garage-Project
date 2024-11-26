// controllers/commonServiceController.js
const { addService, getServices,getServicesById,updateService,deleteService} = require("../services/service.service");

// Add a new service
async function addServiceHandler(req, res) {
  const { service_name, service_description} = req.body;

  if (!service_name || !service_description) {
    return res.status(400).json({ error: "Service name and description are required." });
  }

  try {
    const result = await addService(service_name, service_description);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add service." });
  }
}

// Get all services
async function getServicesHandler(req, res) {
  try {
    const services = await getServices();
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch services." });
  }
}
//GET single service
async function getServiceByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const service = await getServicesById(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found." });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch service." });
  }
}
// Update a service by ID
async function updateServiceHandler(req, res) {
    const { id } = req.params;
    const { service_name, service_description } = req.body;
  
    // Validation
    if (!service_name || !service_description) {
      return res.status(400).json({ error: "Invalid input data." });
    }
  
    try {
      const success = await updateService(id, { service_name, service_description });
      if (!success) {
        return res.status(404).json({ error: "Service not found." });
      }
      res.status(200).json({ message: "Service updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update service." });
    }
  }

// Delete a service by ID
async function deleteServiceHandler(req, res) {
    const { id } = req.params;
  
    try {
      const success = await deleteService(id);
      if (!success) {
        return res.status(404).json({ error: "Service not found." });
      }
      res.status(200).json({ message: "Service deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete service." });
    }
  }
  

module.exports = { addServiceHandler, getServicesHandler, getServiceByIdHandler,updateServiceHandler,deleteServiceHandler };
