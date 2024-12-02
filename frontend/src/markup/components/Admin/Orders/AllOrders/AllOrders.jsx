import React, { useEffect, useState } from "react";
import styles from "./AllOrders.module.css";
import { Table, Button } from "react-bootstrap";
import orderService from "../../../../../services/order.service";
// Import the date-fns library
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function AllOrders() {
  const [orders, setorders] = useState([]);
  const navigator = useNavigate();
  const orderDetail = (order_hash) => {
    navigator(`/admin/order/${order_hash}`);
  };
  useEffect(() => {
    orderService
      .getAllOrders()
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setorders(data?.Orders);
      });
  }, []);
  console.log(orders);
  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Orders</h2>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order id</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Order Date</th>
                <th>Recieved by</th>
                <th>Order Status</th>
                <th>View/Edit</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.order_id}>
                  <td>{order?.order_id}</td>
                  <td>
                    <>
                      {order?.customer_first_name} {order.customer_last_name}
                      <br />
                      {order?.customer_email}
                      <br />
                      {order?.customer_phone_number}
                    </>
                  </td>
                  <td>
                    <>
                      {order?.vehicle_make}
                      <br />
                      {order?.vehicle_year}
                      <br />
                      {order?.vehicle_tag}
                    </>
                  </td>
                  <td>
                    {format(
                      new Date(order?.order_date),
                      "MM - dd - yyyy | kk:mm"
                    )}
                  </td>
                  <td>
                    {order?.employee_first_name} {order?.employee_last_name}
                  </td>
                  <td>
                    {order?.active_order ? (
                      order?.order_status ? (
                        <span className={styles.completed}>Completed</span>
                      ) : (
                        <span className={styles.serviceStatus}>
                          In progress
                        </span>
                      )
                    ) : (
                      <span className={styles.received}>Received</span>
                    )}
                  </td>

                  <td>
                    <div className="edit-delete-icons">
                      <button
                      // onClick={() => editorder(order.order_uuid)}
                      >
                        <FaEdit />
                      </button>
                      {"  "}
                      <button onClick={() => orderDetail(order?.order_hash)}>
                        <FaArrowUpRightFromSquare />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
}

export default AllOrders;
