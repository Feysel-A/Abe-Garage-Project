// services/commonService.js
const db = require("../config/db.config");

// Add a new service
async function addService(service_name, service_description) {
  const [result] = await db.query(
    `INSERT INTO common_services (service_name, service_description)
     VALUES (?, ?)`,
    [service_name, service_description]
  );
  return { message: "Service added successfully", serviceId: result.insertId };
}

// Fetch all services
async function getServices() {
  const [rows] = await db.query(`SELECT * FROM common_services`);
  return rows;
}
//Fetch single service
async function getServicesById(id) {
  const [rows] = await db.query(
    `SELECT * FROM common_services WHERE service_id = ?`,
    [id]
  );
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
  const connection = await db.getConnection(); // Use a transactional connection
  try {
    await connection.beginTransaction();

    // Delete dependent rows in the order_services table first
    await connection.query(`DELETE FROM order_services WHERE service_id = ?`, [
      serviceId,
    ]);

    // Then delete the service from the common_services table
    const [result] = await connection.query(
      `DELETE FROM common_services WHERE service_id = ?`,
      [serviceId]
    );

    await connection.commit(); // Commit the transaction

    return result.affectedRows > 0; // Returns true if a row was deleted
  } catch (error) {
    await connection.rollback(); // Rollback the transaction on error
    throw error; // Rethrow the error for proper error handling
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

module.exports = {
  addService,
  getServices,
  getServicesById,
  updateService,
  deleteService,
};
