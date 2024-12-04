import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { format } from "date-fns";
import customerService from "../../../../../services/customer.service";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    customerService
      .getAllCustomer()
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomers(data?.data);
      })
      .catch((error) => console.error(error));
  }, [customers]);
  console.log(customers);
  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>customers</h2>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Added Date</th>
                <th>Actives</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {customers?.map((customer) => (
                <tr key={customer.customer_id}>
                  <td>{customer.customer_id}</td>
                  <td>{customer.customer_first_name}</td>
                  <td>{customer.customer_last_name}</td>
                  <td>{customer.customer_email}</td>
                  <td>{customer.customer_phone_number}</td>
                  <td>
                    {format(
                      new Date(customer.customer_added_date),
                      "MM - dd - yyyy | kk:mm"
                    )}
                  </td>
                  <td>{customer.active_customer_status ? "Yes" : "No"}</td>
                  <td>
                    <div className="edit-delete-icons">
                      <button
                        onClick={() =>
                          navigator(`/admin/customer/${customer.customer_hash}`)
                        }
                      >
                        <FaEdit />
                      </button>{" "}
                      <button
                        onClick={() =>
                          navigator(
                            `/admin/customer-profile/${customer.customer_hash}`
                          )
                        }
                      >
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

export default CustomerList;
