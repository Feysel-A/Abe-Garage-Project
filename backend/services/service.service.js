// services/commonService.js
const db = require("../config/db.config");

// Add a new service
async function addService(service_name, service_description) {
  const [result] = await db.query(
    `INSERT INTO common_services (service_name, service_description)
     VALUES (?, ?)`,
    [service_name, service_description]
  );
  return { success: true, serviceId: result.insertId };
}

// Fetch all services
async function getServices() {
  const [rows] = await db.query(`SELECT * FROM common_services`);
  return rows;
}
//Fetch single service
async function getServicesById(id) {
  const [rows] = await db.query(`SELECT * FROM common_services WHERE service_id = ?`, [
    id,
  ]);
  return rows[0];
}
//Update service details
// Update a service by ID
async function updateService(serviceId, updatedData) {
    const { service_name, service_description } = updatedData;
  
    const [result] = await db.query(
      `UPDATE common_services 
       SET service_name = ?, service_description = ? 
       WHERE service_id = ?`,
      [service_name, service_description, serviceId]
    );
  
    return result.affectedRows > 0;
  }
  //Delete a service by ID
  async function deleteService(serviceId) {
    const [result] = await db.query(
      `DELETE FROM common_services WHERE service_id = ?`,
      [serviceId]
    );
    return result.affectedRows > 0; // Returns true if a row was deleted
  }
module.exports = { addService, getServices,getServicesById,updateService,deleteService };
