// Import the necessary components
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Context/AuthContext";
// Import the date-fns library
import { format } from "date-fns";
// To properly format the date on the table
// Import the getAllEmployees function
import employeeService from "../../../../services/employee.service";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function EmployeeList() {
  const navigate = useNavigate();
  // Create all the states we need to store the data
  // Create the employees state to store the employees data
  const [employees, setEmployees] = useState([]);
  // A state to serve as a flag to show the error message
  const [apiError, setApiError] = useState(false);
  // A state to store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // To get the logged in employee token
  const { employee } = useAuth();
  let token = null; // To store the token
  if (employee) {
    token = employee.employee_token;
  }
  const editEmployee = (uuid) => {
    navigate(`/admin/update/employee/${uuid}`);
  };
  const deleteEmployee = (uuid) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this employee.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            employeeService
              .deleteEmployee(uuid, token)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                console.log(data.message);
                alert(data.message);
              }),
        },
        {
          label: "No",
        },
      ],
    });
  };
  useEffect(() => {
    // Call the getAllEmployees function
    const allEmployees = employeeService.getAllEmployees(token);
    allEmployees
      .then((res) => {
        if (!res.status === 200) {
          console.log(res.status);
          setApiError(true);
          if (res.status === 400) {
            setApiErrorMessage("Please login again");
          } else if (res.status === 401) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data?.length !== 0) {
          console.log(data);
          setEmployees(data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [employees]);
  //   console.log(employees);
  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Employees</h2>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Actives</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Role</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {employees?.map((employee) => (
                    <tr key={employee.employee_id}>
                      <td>{employee.active_employee ? "Yes" : "No"}</td>
                      <td>{employee.employee_first_name}</td>
                      <td>{employee.employee_last_name}</td>
                      <td>{employee.employee_email}</td>
                      <td>{employee.employee_phone}</td>
                      <td>
                        {format(
                          new Date(employee.added_date),
                          "MM - dd - yyyy | kk:mm"
                        )}
                      </td>
                      <td>{employee.company_role_name}</td>
                      <td>
                        <div className="edit-delete-icons">
                          <button
                            onClick={() => editEmployee(employee.employee_uuid)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() =>
                              deleteEmployee(employee.employee_uuid)
                            }
                          >
                            <MdDelete />
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
      )}
    </>
  );
}

export default EmployeeList;
