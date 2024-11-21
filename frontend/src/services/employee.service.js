// Import from the env
const api_url = import.meta.env.VITE_API_URL;
// A function to send post request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  console.log(requestOptions);
  const response = await fetch(`${api_url}/api/admin/employee`, requestOptions);
  return response;
};
// A function to send get request to get all employees
const getAllEmployees = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/employees`, requestOptions);
  return response;
};
//A function to send get request to get single employee
const singleEmployee = async (employee_hash, loggedInEmployeeToken) => {
  // console.log(employee_hash)
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };
  const response = await fetch(
    `${api_url}/api/employee/single/${employee_hash}`,
    requestOptions
  );
  return response;
};
//A function to update employee
const updateEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  console.log(requestOptions);
  const response = await fetch(
    `${api_url}/api/employee/${formData.employee_hash}`,
    requestOptions
  );
  return response;
};
const deleteEmployee = async (uuid, token) => {
  console.log(token);
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/employee/${uuid}`,
    requestOptions
  );
  return response;
};
// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  singleEmployee,
};
export default employeeService;
