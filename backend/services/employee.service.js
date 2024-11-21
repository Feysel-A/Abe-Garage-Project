// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
//Import the uuid module
const { v4: uuidv4 } = require("uuid");
// A function to check if an employee exists in the database
async function checkIfEmployeeExists(email) {
  console.log("Checking if employee exists with email:", email);
  const query = "SELECT employee_id FROM employee WHERE employee_email = ?";
  const [rows] = await conn.query(query, [email]);
  // console.log("Employee exists:", rows.length > 0);
  return rows;
}
// Function to get Employee ID by UUID
async function getEmployeeId(uuid) {
  const query = "SELECT employee_id FROM employee WHERE employee_uuid = ?";
  const [rows] = await conn.query(query, [uuid]);
  return rows;
}
// A function to create a new employee
async function createEmployee(employee) {
  console.log("Creating employee with data:", employee);
  let createdEmployee = {};

  try {
    // Generate a UUID for the new employee
    const employeeUUID = uuidv4();

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    // Insert email, active status, and UUID into the employee table
    const query1 = `
      INSERT INTO employee (employee_email, active_employee, employee_uuid)
      VALUES (?, ?, ?)
    `;
    const [rows1] = await conn.query(query1, [
      employee.employee_email,
      employee.active_employee,
      employeeUUID,
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
      employee_uuid: employeeUUID, // include the UUID in the returned object
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
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const [rows] = await conn.query(query, [employee_email]);
  return rows;
}
//A functoin to get all employees
async function getAllEmployees() {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 10";
  const [rows] = await conn.query(query);
  return rows;
}
//A function to get single employee
async function getEmployeeById(uuid) {
  const query = `
  SELECT 
    e.employee_id, e.employee_uuid, e.employee_email, e.active_employee, 
    e.added_date, ei.employee_first_name, ei.employee_last_name, 
    ei.employee_phone, er.company_role_id, cr.company_role_name
  FROM employee AS e
  JOIN employee_info AS ei ON e.employee_id = ei.employee_id
  JOIN employee_role AS er ON e.employee_id = er.employee_id
  JOIN company_roles AS cr ON er.company_role_id = cr.company_role_id
  WHERE e.employee_uuid = ?;
`;
  try {
    const [result] = await conn.query(query, [uuid]);
    return result[0]; // Return the first matching employee or undefined if not found
  } catch (error) {
    throw new Error("Failed to fetch employee: " + error.message);
  }
}
//A function to update the employee
async function updateEmployee(employeeId, updatedData) {
  // const queryCheck =
  //   "SELECT employee_id FROM employee WHERE employee_uuid = ?";
  try {
    //   // Array to store any error messages if updates fail in individual tables
    const errors = [];
    //   // Check if the employee exists
    //   const [result] = await conn.query(queryCheck, [employeeId]);
    //   if (result.length === 0) {
    //     return "not_found";
    //   }
    const result = await getEmployeeId(employeeId);
    const employee_id = result[0].employee_id;
    // Update the `employee` table (email and active status)
    if (
      updatedData.employee_email ||
      updatedData.active_employee !== undefined
    ) {
      const queryEmployee = `
        UPDATE employee 
        SET employee_email = COALESCE(?, employee_email), 
            active_employee = COALESCE(?, active_employee) 
        WHERE employee_id = ?
      `;
      const [resultEmployee] = await conn.query(queryEmployee, [
        updatedData.employee_email,
        updatedData.active_employee,
        employee_id,
      ]);
      if (resultEmployee.affectedRows === 0)
        errors.push("Failed to update employee table");
    }

    // Update `employee_info` table (first name, last name, phone)
    if (
      updatedData.employee_first_name ||
      updatedData.employee_last_name ||
      updatedData.employee_phone
    ) {
      const queryInfo = `
        UPDATE employee_info 
        SET employee_first_name = COALESCE(?, employee_first_name), 
            employee_last_name = COALESCE(?, employee_last_name), 
            employee_phone = COALESCE(?, employee_phone)
        WHERE employee_id = ?
      `;
      const [resultInfo] = await conn.query(queryInfo, [
        updatedData.employee_first_name,
        updatedData.employee_last_name,
        updatedData.employee_phone,
        employee_id,
      ]);
      if (resultInfo.affectedRows === 0)
        errors.push("Failed to update employee_info table");
    }

    // Update `employee_pass` table (password)
    // const queryPass = `
    //     UPDATE employee_pass 
    //     SET employee_password_hashed = ? 
    //     WHERE employee_id = ?
    //   `;
    // const [resultPass] = await conn.query(queryPass, [
    //   updatedData.employee_password,
    //   employee_id,
    // ]);
    // if (resultPass.affectedRows === 0)
    //   errors.push("Failed to update employee_pass table");

    // Update `employee_role` table (role)
    if (updatedData.company_role_id) {
      const queryRole = `
        UPDATE employee_role 
        SET company_role_id = ? 
        WHERE employee_id = ?
      `;
      const [resultRole] = await conn.query(queryRole, [
        updatedData.company_role_id,
        employee_id,
      ]);
      if (resultRole.affectedRows === 0)
        errors.push("Failed to update employee_role table");
    }

    // Return results
    // console.log(errors.length)
    if (errors.length > 0) {
      return { success: false, message: "Some updates failed", errors };
    } else {
      return { success: true, message: "Employee updated successfully" };
    }
  } catch (error) {
    console.error("Error in updateEmployee:", error.message);
    throw new Error("Unexpected server error");
  }
}
//A function to delete the employee
async function deleteEmployee(employeeId) {
  try {
    // Delete employee from all related tables
    await conn.query("DELETE FROM employee_pass WHERE employee_id = ?", [
      employeeId,
    ]);
    await conn.query("DELETE FROM employee_info WHERE employee_id = ?", [
      employeeId,
    ]);
    await conn.query("DELETE FROM employee_role WHERE employee_id = ?", [
      employeeId,
    ]);
    await conn.query("DELETE FROM employee WHERE employee_id = ?", [
      employeeId,
    ]);
    return "success";
  } catch (error) {
    console.log(error);
    return error;
  }
}
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  getEmployeeId,
  deleteEmployee,
};
