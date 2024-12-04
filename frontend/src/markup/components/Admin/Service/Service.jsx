import React, { useEffect, useState } from "react";
import service from "../../../../services/service.service";
import styles from "./Service.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import { useAuth } from "../../../../Context/AuthContext";
import { BeatLoader } from "react-spinners";

function Service() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null); // Tracks which service is being edited
  const [updatedName, setUpdatedName] = useState(""); // Tracks updated service name
  const [updatedDescription, setUpdatedDescription] = useState(""); // Tracks updated description
  const [success, setSuccess] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [spinner, setSpinner] = useState(false);
  // To get the logged in employee token
  const { employee } = useAuth();
  let token = null; // To store the token
  if (employee) {
    token = employee.employee_token;
  }
  const fetchServices = () => {
    service
      .getAllServices()
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      });
  };

  useEffect(() => {
    fetchServices();
  }, [services]);

  const handleEditClick = (service) => {
    setEditingService(service.service_id); // Set the service being edited
    setUpdatedName(service.service_name); // Prepopulate with the existing name
    setUpdatedDescription(service.service_description); // Prepopulate with the existing description
  };

  const handleSaveClick = (serviceId) => {
    const updatedService = {
      service_name: updatedName,
      service_description: updatedDescription,
    };
    service
      .editService(serviceId, updatedService)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Update the service in the local state
        setServices((prevServices) =>
          prevServices.map((s) =>
            s.service_id === serviceId ? { ...s, ...updatedService } : s
          )
        );
        setEditingService(null); // Exit editing mode
        setSuccess("Service updated successfully!");
      });
  };

  const handleCancelClick = () => {
    setEditingService(null); // Exit editing mode without saving
  };
  const deleteService = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this service.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            service
              .deleteService(id, token)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                console.log(data);
                setSuccess(data.message);
              }),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleAddService = (e) => {
    e.preventDefault();
    setSpinner(true);
    const newService = {
      service_name: serviceName,
      service_description: serviceDescription,
    };
    service
      .addService(newService)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSpinner(false);
        setSuccess(data.message);
        setServiceName("");
        setServiceDescription("");
      })
      .catch((error) => {
        console.log(error);
        setSpinner(false);
      });
  };
  return (
    <div className={styles.container}>
      <div className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <div>
              <h2>Services we provide</h2>{" "}
            </div>
            <p className={styles.description}>
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution. User-generated content in
              real-time will have multiple touchpoints for offshoring.
            </p>
            {services?.map((service) => (
              <div
                key={service.service_id}
                className="bg-white Regular my-2 d-flex shadow-sm"
              >
                <div className="py-4 pb-1 px-4 flex-grow-1">
                  {editingService === service.service_id ? (
                    <>
                      <input
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className={styles.input}
                        placeholder="Service Name"
                      />
                      <textarea
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        className={styles.textarea}
                        placeholder="Service Description"
                      />
                    </>
                  ) : (
                    <>
                      <h5 className="mb-1 font-weight-bold">
                        {service.service_name}
                      </h5>
                      <h6 className="mb-1 text-secondary">
                        {service.service_description}
                      </h6>
                    </>
                  )}
                </div>
                <div className={styles.button_container}>
                  {editingService === service.service_id ? (
                    <>
                      <button
                        onClick={() => handleSaveClick(service.service_id)}
                      >
                        Save
                      </button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditClick(service)}>
                      <FaEdit color="red" />
                    </button>
                  )}
                  {"  "}
                  <button onClick={() => deleteService(service.service_id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
            {success && <p className={styles.success}>{success}</p>}
            <form
              onSubmit={handleAddService}
              className="contact-section pt-0 pb-4"
            >
              {/* Add New Service */}
              <div className="mr-5 mt-4 contact-title ">
                <div className="pb-0  d-flex order-danger ">
                  <div className="p-3 px-5 flex-grow-1 bg-white ">
                    <h2>Add a new service</h2>
                    <div className="contact-form ">
                      <div>
                        <div className="row clearfix">
                          <div className="form-group col-md-12">
                            <input
                              className="mb-3"
                              type="text"
                              placeholder="Service Name"
                              value={serviceName}
                              onChange={(e) => setServiceName(e.target.value)}
                            />
                            <textarea
                              type="text"
                              value={serviceDescription}
                              placeholder="Service Description"
                              onChange={(e) =>
                                setServiceDescription(e.target.value)
                              }
                              required
                            ></textarea>
                          </div>
                          <div className="form-group col-md-12 pl-3">
                            <button
                              className="theme-btn btn-style-one"
                              type="submit"
                            >
                              <span>
                                {spinner ? (
                                  <BeatLoader color="white" size={8} />
                                ) : (
                                  "ADD SERVICE"
                                )}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
