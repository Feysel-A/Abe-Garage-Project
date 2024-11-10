// Import the employee service
const employeeService = require("../services/employee.service");
// Create the add employee controller
const bcrypt = require("bcrypt");
async function createEmployee(req, res, next) {
  //   console.log(req.body);

  // Define the required fields
  const requiredFields = [
    "employee_email",
    "employee_first_name",
    "employee_last_name",
    "employee_phone",
    "employee_password",
  ];

  // Check if all required fields are present
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }
  }
  // Check if employee email already exists in the database
  const employeeExists = await employeeService.checkIfEmployeeExists(
    req.body.employee_email
  );
  // If employee exists, send a response to the client
  if (employeeExists) {
    res.status(400).json({
      error: "This email address is already associated with another employee!",
    });
  } else {
    try {
      const employeeData = req.body;
      // Create the employee
      const employee = await employeeService.createEmployee(employeeData);
      if (!employee) {
        res.status(400).json({
          error: "Failed to add the employee!",
        });
      } else {
        res.status(200).json({
          message: "Employee created successfully",
          success: "true",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
      });
    }
  }
}
// Create the getAllEmployees controller
async function getAllEmployees(req, res, next) {
  // Call the getAllEmployees method from the employee service
  const employees = await employeeService.getAllEmployees();
  // console.log(employees);
  if (!employees) {
    res.status(400).json({
      error: "Failed to get all employees!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employees,
    });
  }
}
// Create update the employee controller
async function updateEmployee(req, res) {
  try {
    const employeeId = req.params.id;
    const {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    } = req.body;

    // Validate required fields (e.g., email)
    if (
      !employee_email ||
      !employee_first_name ||
      !employee_last_name ||
      !employee_phone ||
      !company_role_id
    ) {
      return res
        .status(400)
        .json({ message: "Missing or invalid request fields" });
    }

    // Prepare data for update
    let updatedData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
    };
    if (employee_password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(employee_password, salt);
      updatedData.employee_password = hashedPassword;
    }

    // Call the service to update employee details
    const updateResult = await employeeService.updateEmployee(
      employeeId,
      updatedData
    );

    if (updateResult === "not_found") {
      return res.status(404).json({ message: "Employee not found" });
    }
    if (updateResult === "exist") {
      return res
        .status(400)
        .json({ message: "This email is already in use by another employee." });
    }
    return res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unexpected server error" });
  }
}
//Create delete employee controller
async function deleteEmployee(req, res) {
  const employeeUuid = req.params.id;
  try {
    // Check if employee exists
    const [employee] = await employeeService.getEmployeeId(employeeUuid);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Call the service to delete employee
    const deleteResult = await employeeService.deleteEmployee(
      employee.employee_id
    );
    if (deleteResult === "success") {
      return res.status(200).json({ message: "Employee deleted successfully" });
    }
  } catch (error) {
    console.error("Error in deleteEmployee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
// Export the createEmployee controller
module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
