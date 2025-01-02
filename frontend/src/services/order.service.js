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
const getSingleOrder = async (order_hash, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    "x-access-token": token,
  };
  const response = await fetch(
    `${api_url}/api/order/${order_hash}`,
    requestOptions
  );
  return response;
};
//A function to get customer order
const getSingleCustomerOrders = async (customer_hash, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/customer/orders/${customer_hash}`,
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
const updateOrderStatus = async (data, token) => {
  console.log(data);
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(
      data // The overall order status (0 for In Progress, 1 for Completed)
    ),
  };

  try {
    const response = await fetch(`${api_url}/api/update-order`, requestOptions);
    console.log(response);

    return response; // Return the successful response data
  } catch (error) {
    console.log(error);

    // throw new Error(error.message || "Failed to update order status.");
  }
};
//A function to updated
const orderService = {
  createNewOrder,
  getSingleOrder,
  getAllOrders,
  getSingleCustomerOrders,
  updateOrderStatus,
};
export default orderService;
