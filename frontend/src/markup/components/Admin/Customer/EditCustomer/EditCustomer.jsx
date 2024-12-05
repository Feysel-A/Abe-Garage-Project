import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../../Context/AuthContext";
import customerService from "../../../../../services/customer.service";
function EditCustomer() {
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone_number, setPhoneNumber] = useState(""); // Default to 'Employee'
  const [active_customer_status, setActivecustomer] = useState(false);
  // Define error states
  const [serverError, setServerError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { customer_hash } = useParams();
  // Create a variable to hold the user's token
  let loggedInEmployeeToken = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Construct the form data
    const formData = {
      customer_hash,
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    };

    // Call the service to update a new employee
    customerService
      .updateCustomer(formData, loggedInEmployeeToken)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // If error is returned from the API server, set the error message
        if (data.error || data.errors) {
          setServerError(data.error || data.errors);
        } else {
          navigate("/admin/customers");
        }
      })
      .catch((error) => {
        console.log(error);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        // setServerError(resMessage);
      });
  };
  useEffect(() => {
    // function to fetch data
    const fetchEmployeeData = async () => {
      try {
        const data = customerService
          ?.getSingleCustomer(customer_hash, loggedInEmployeeToken)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setEmail(data?.customer_email);
            setFirstName(data?.customer_first_name);
            setLastName(data?.customer_last_name);
            setPhoneNumber(data?.customer_phone_number);
            setActivecustomer(data?.active_customer_status);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployeeData();
  }, []);

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit: {customer_first_name} {customer_last_name}{" "}
          </h2>
          <h4>customer email:{customer_email}</h4>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit} className="formSize">
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        value={customer_first_name}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="customer first name"
                      />
                      {firstNameRequired && (
                        <div className="validation-error" role="alert">
                          {firstNameRequired}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        value={customer_last_name}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="customer last name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone"
                        value={customer_phone_number}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        placeholder="customer phone (555-555-5555)"
                        required
                      />
                    </div>

                    {/* <div className="form-group col-md-12">
                      <input
                        type="password"
                        name="customer_password"
                        value={customer_password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="customer password"
                      />
                      {passwordError && (
                        <div className="validation-error" role="alert">
                          {passwordError}
                        </div>
                      )}
                    </div> */}

                    <div className="form-group col-md-12">
                      <label>
                        <input
                          type="checkbox"
                          checked={active_customer_status}
                          onChange={(event) =>
                            setActivecustomer(event.target.checked)
                          }
                        />{" "}
                        Is active customer
                      </label>
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Update</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditCustomer;
