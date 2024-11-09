// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");

// A function to check if an employee exists in the database
async function checkIfEmployeeExists(email) {
  console.log("Checking if employee exists with email:", email);
  const query = "SELECT employee_id FROM employee WHERE employee_email = ?";
  const [rows] = await conn.query(query, [email]);
  console.log("Employee exists:", rows.length > 0);
  return rows.length > 0;
}

// A function to create a new employee
async function createEmployee(employee) {
  console.log("Creating employee with data:", employee);
  let createdEmployee = {};

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    // Insert email and active status into employee table
    const query1 =
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
    const [rows1] = await conn.query(query1, [
      employee.employee_email,
      employee.active_employee,
    ]);

    if (rows1.affectedRows !== 1) {
      console.error("Failed to insert into employee table");
      return null;
    }

    // Get the employee ID of the newly inserted record
    const employee_id = rows1.insertId;

    // Insert employee info
    const query2 = `
      INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone)
      VALUES (?, ?, ?, ?)
    `;
    const [rows2] = await conn.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);
    if (rows2.affectedRows !== 1) {
      console.error("Failed to insert into employee_info table");
      return null;
    }

    // Insert employee password
    const query3 = `
      INSERT INTO employee_pass (employee_id, employee_password_hashed)
      VALUES (?, ?)
    `;
    const [rows3] = await conn.query(query3, [employee_id, hashedPassword]);
    if (rows3.affectedRows !== 1) {
      console.error("Failed to insert into employee_pass table");
      return null;
    }

    // Insert employee role
    const query4 = `
      INSERT INTO employee_role (employee_id, company_role_id)
      VALUES (?, ?)
    `;
    const [rows4] = await conn.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);
    if (rows4.affectedRows !== 1) {
      console.error("Failed to insert into employee_role table");
      return null;
    }

    // Construct the employee object to return
    createdEmployee = {
      employee_id: employee_id,
      employee_email: employee.employee_email,
      active_employee: employee.active_employee,
    };
  } catch (error) {
    console.error("Error in createEmployee:", error);
    return null;
  }

  // Return the created employee object
  return createdEmployee;
}
// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query = "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const [rows] = await conn.query(query, [employee_email]);
  return rows;
}

module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
};
