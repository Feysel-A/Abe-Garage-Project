// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Find customer by email
exports.findCustomerByEmail = async (email) => {
  const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";
  const [rows] = await conn.query(query, [email]);
  return rows[0]; // Return the first result or undefined
};

// Create a new customer
exports.createCustomer = async (customerData) => {
  const {
    customer_email,
    customer_phone_number,
    customer_hash,
    customer_first_name,
    customer_last_name,
  } = customerData;

  const connection = await conn.getConnection();

  try {
    // Begin transaction
    await connection.beginTransaction();

    // Insert into `customer_identifier`
    const identifierQuery = `
      INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash)
      VALUES (?, ?, ?)
    `;
    const [identifierResult] = await connection.query(identifierQuery, [
      customer_email,
      customer_phone_number,
      customer_hash,
    ]);
    const customerId = identifierResult.insertId;

    // Insert into `customer_info`
    const infoQuery = `
      INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status)
      VALUES (?, ?, ?, ?)
    `;
    await connection.query(infoQuery, [
      customerId,
      customer_first_name,
      customer_last_name,
      1,
    ]);

    // Commit transaction
    await connection.commit();

    return customerId; // Return the newly created customer ID
  } catch (error) {
    // Rollback transaction in case of error
    console.log(error);
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
//Get all customers
exports.getAllCustomers = async () => {
  try {
    const query = `
      SELECT 
        ci.customer_id, 
        ci.customer_email, 
        ci.customer_phone_number, 
        ci.customer_added_date,
        ci.customer_hash,
        info.customer_first_name,
        info.customer_last_name,
        info.active_customer_status
      FROM 
        customer_identifier AS ci
      JOIN 
        customer_info AS info 
      ON 
        ci.customer_id = info.customer_id;
    `;
    const [results] = await conn.query(query);
    // Send successful response
    return {
      status: "success",
      data: results,
    };
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
//GET Single Customer
exports.getCustomerByHash = async (hash) => {
  try {
    const query = `
            SELECT 
                ci.customer_id,
                ci.customer_email,
                ci.customer_phone_number,
                ci.customer_added_date,
                ci.customer_hash,
                info.customer_first_name,
                info.customer_last_name,
                info.active_customer_status
            FROM customer_identifier AS ci
            INNER JOIN customer_info AS info
            ON ci.customer_id = info.customer_id
            WHERE ci.customer_hash = ?
        `;

    const [rows] = await conn.query(query, [hash]);

    // Return the customer if found, otherwise return null
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error in getCustomerByHash service:", error.message);
    throw error;
  }
};

const getCustomerId = async (hash)=> {
  try {
    const query = `
      SELECT customer_id 
      FROM customer_identifier 
      WHERE customer_hash = ?
    `;
    const [result] = await conn.execute(query, [hash]);
    return result;
  } catch (error) {
    console.error("Error in getCustomerId:", error.message);
    throw new Error("Failed to fetch customer ID");
  }
}
// Update customer details by hash
exports.updateCustomer = async (hash, updatedData) => {
  try {
    const errors = []; // Array to track any update failures.

    // Step 1: Retrieve the customer_id using the hash
    const result = await getCustomerId(hash);
    if (!result || result.length === 0) {
      return "not_found"; // Return if the customer does not exist.
    }
    const customer_id = result[0].customer_id;

    // Step 2: Update the `customer_identifier` table (if applicable)
    if (updatedData.customer_phone_number) {
      const queryIdentifier = `
        UPDATE customer_identifier 
        SET customer_phone_number = COALESCE(?, customer_phone_number)
        WHERE customer_id = ?
      `;
      const [resultIdentifier] = await conn.execute(queryIdentifier, [
        updatedData.customer_phone_number,
        customer_id,
      ]);

      if (resultIdentifier.affectedRows === 0) {
        errors.push("Failed to update customer_identifier table");
      }
    }

    // Step 3: Update the `customer_info` table (first name, last name)
    if (updatedData.customer_first_name || updatedData.customer_last_name) {
      const queryInfo = `
        UPDATE customer_info 
        SET customer_first_name = COALESCE(?, customer_first_name),
            customer_last_name = COALESCE(?, customer_last_name)
        WHERE customer_id = ?
      `;
      const [resultInfo] = await conn.execute(queryInfo, [
        updatedData.customer_first_name,
        updatedData.customer_last_name,
        customer_id,
      ]);

      if (resultInfo.affectedRows === 0) {
        errors.push("Failed to update customer_info table");
      }
    }

    // Step 4: Return Results
    if (errors.length > 0) {
      return { success: false, message: "Some updates failed", errors };
    } else {
      return { success: true, message: "Customer updated successfully" };
    }
  } catch (error) {
    console.error("Error in updateCustomer:", error.message);
    throw new Error("Unexpected server error");
  }
};
