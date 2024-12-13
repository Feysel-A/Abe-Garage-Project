// Import from the env
const api_url = import.meta.env.VITE_API_URL;
//A function to add a new vehicle
const addVehicle = async (data, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
};
//A function to send get request to get single vehiclee for customer
const getSingleVehicle = async (customer_hash, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    "x-access-token": token,
  };
  const response = await fetch(
    `${api_url}/api/vehicle/single/${customer_hash}`,
    requestOptions
  );
  return response;
};
const getVehicleById = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${api_url}/api/vehicle/${id}`, requestOptions);
  return response;
};
//A function to update single vehicle
const updateVehicle = async (id, data) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `${api_url}/api/update-vehicle/${id}`,
    requestOptions
  );
  return response;
};
const vehicleService = {
  getSingleVehicle,
  addVehicle,
  getVehicleById,
  updateVehicle,
};
export default vehicleService;
