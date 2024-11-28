// Import from the env
const api_url = import.meta.env.VITE_API_URL;
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
const service = {
  getAllServices,
};
export default service;
