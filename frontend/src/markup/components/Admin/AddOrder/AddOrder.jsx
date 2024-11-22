import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddOrder.module.css";
import { FaHandPointer } from "react-icons/fa";
import customerService from "../../../../services/customer.service";

function AddOrder() {
  const [customersData, setCustomersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = customerService
          .getAllCustomer()
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            // console.log(data);
            setCustomersData(data.data);
          });
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);
  // console.log(customersData);
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = customersData.filter(
        (customer) =>
          customer.customer_first_name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          customer.customer_last_name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          customer.customer_email.toLowerCase().includes(query.toLowerCase()) ||
          customer.customer_phone_number
            .toLowerCase()
            .includes(query.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers([]);
    }
  };

  const handleSelectCustomer = (customer_id) => {
    navigate(
      `/admin/customers/customer-profile/${customer_id}?view=chooseVehicle`
    );
  };

  const handleAddCustomer = () => {
    navigate("/admin/add-customer"); // Navigate to the "Add Customer" page
  };

  return (
    <div className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Create a new order</h2>
        </div>
      </div>

      <div className="contact-form">
        <div className="form-group col-md-12">
          <input
            type="text"
            placeholder="Search by Name, Email, or Phone"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {!searchQuery && (
            <div className="form-group col-md-12">
              <button
                className="theme-btn btn-style-one"
                type="submit"
                data-loading-text="Please wait..."
                onClick={handleAddCustomer}
              >
                <span>ADD NEW CUSTOMER</span>
              </button>
          </div>
        )}

        {searchQuery && filteredCustomers.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.customer_id}>
                  <td>{customer.customer_first_name}</td>
                  <td>{customer.customer_last_name}</td>
                  <td>{customer.customer_email}</td>
                  <td>{customer.customer_phone_number}</td>
                  <td>
                    <FaHandPointer
                      className={styles.pointerIcon}
                      onClick={() => handleSelectCustomer(customer.customer_id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {searchQuery && filteredCustomers.length === 0 && (
          <>
            <p className={styles.noResults}>No customers found.</p>
            <div style={{ paddingLeft: "100px" }}>
              <div className="form-group col-md-12">
                <button
                  className="theme-btn btn-style-one"
                  type="submit"
                  data-loading-text="Please wait..."
                  onClick={handleAddCustomer}
                >
                  <span>ADD NEW CUSTOMER</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddOrder;
