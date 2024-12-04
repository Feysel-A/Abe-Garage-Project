// Import from the env
const api_url = import.meta.env.VITE_API_URL;
//A function to send post request to create a new service
const addService = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${api_url}/api/add-services`, requestOptions);
  return response;
}
// A function to send get request to get all services
const getAllServices = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${api_url}/api/services`, requestOptions);
  return response;
};
//A function  to send put request to update service update
const editService = async (id, data) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `${api_url}/api/update-service/${id}`,
    requestOptions
  );
  return response;
};
//A function to delete service
const deleteService = async (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // "x-access-token": loggedInEmployeeToken,
    },
  };
  const response = await fetch(
    `${api_url}/api/delete-service/${id}`,
    requestOptions
  );
  return response;
}
const service = {
  addService,
  getAllServices,
  editService,
  deleteService
};
export default service;
