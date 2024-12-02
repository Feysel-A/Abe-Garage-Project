// Import from the env
const api_url = import.meta.env.VITE_API_URL;
//A function to create new orders
const createNewOrder = (newOrder, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(newOrder),
  };
  console.log(requestOptions);
  const response = fetch(`${api_url}/api/order`, requestOptions);
  return response;
};
//A function to get single order
const getSingleOrder = async (order_hash) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${api_url}/api/order/${order_hash}`,
    requestOptions
  );
  return response;
};
//A function to get All orders
const getAllOrders = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/orders`, requestOptions);
  return response;
};
const orderService = {
  createNewOrder,
  getSingleOrder,
  getAllOrders,
};
export default orderService;
