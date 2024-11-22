const {
  createCustomer,
  findCustomerByEmail,
  getAllCustomers,
  getCustomerByHash,
  updateCustomer,
} = require("../services/customer.service");
//Import the uuid module
const { v4: uuidv4 } = require("uuid");
// Create a new customer controller 
exports.addCustomer = async (req, res) => {
  const {
    customer_email,
    customer_phone_number,
    customer_first_name,
    customer_last_name,
  } = req.body;

  // Validation
  if (
    !customer_email ||
    !customer_phone_number ||
    !customer_first_name ||
    !customer_last_name
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(customer_email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    // Check if customer already exists
    const existingCustomer = await findCustomerByEmail(customer_email);
    if (existingCustomer) {
      return res
        .status(409)
        .json({ error: "Customer with this email already exists" });
    }

    // Generate a hash for the customer
    const customer_hash = uuidv4();

    // Create customer in database
    const customerId = await createCustomer({
      customer_email,
      customer_phone_number,
      customer_hash,
      customer_first_name,
      customer_last_name,
    });

    res
      .status(201)
      .json({
        message: "Customer created successfully",
        customer_id: customerId,
      });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
//Create a function to get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
// Get a single customer by hash

exports.getSingleCustomerByHash = async (req, res) => {
    try {
        const { hash } = req.params;

        // Validate hash
        if (!hash || typeof hash !== 'string' || hash.trim().length === 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'The customer hash provided is invalid or missing.',
            });
        }

        // Fetch customer data
        const customer = await getCustomerByHash(hash);

        if (!customer) {
            return res.status(404).json({
                error: 'Customer not found',
                message: 'The customer hash provided does not exist.',
            });
        }

        // Return customer data
        res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error.message);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'An error occurred while fetching customer data.',
        });
    }
};
//Update customer information by hash

exports.updateCustomer = async (req, res) => {
  try {
    const { hash } = req.params; // Customer hash from the URL
    const { customer_phone_number, customer_first_name, customer_last_name } =
      req.body;

    // Validate hash
    if (!hash || typeof hash !== "string" || hash.trim() === "") {
      return res.status(400).json({
        error: "Bad Request",
        message: "The customer hash provided is invalid or missing.",
      });
    }

    // Check if at least one field is provided for update
    if (!customer_phone_number && !customer_first_name && !customer_last_name) {
      return res.status(400).json({
        error: "Bad Request",
        message:
          "At least one field (phone number, first name, or last name) is required to update.",
      });
    }

    // Call service to update customer details
    const updateResult = await updateCustomer(hash, {
      customer_phone_number,
      customer_first_name,
      customer_last_name,
    });

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        error: "Customer not found",
        message: "The customer hash provided does not exist.",
      });
    }

    res.status(200).json({
      message: "Customer updated successfully",
    });
  } catch (error) {
    console.error("Error updating customer:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while updating customer data.",
    });
  }
};