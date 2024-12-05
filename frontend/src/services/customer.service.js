// Import from the env
const api_url = import.meta.env.VITE_API_URL;
// A function to send get request to get all customers
const getAllCustomer = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/all-customers`, requestOptions);
  return response;
};
//A function to send get request to get single customer
const getSingleCustomer = async (customer_hash, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/customer/${customer_hash}`,
    requestOptions
  );
  return response;
};
//A function to update employee
const updateCustomer = async (formData, loggedInEmployeeToken) => {
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
    `${api_url}/update-customer/${formData.customer_hash}`,
    requestOptions
  );
  return response;
};
const customerService = {
  getAllCustomer,
  getSingleCustomer,
  updateCustomer,
};
export default customerService;
