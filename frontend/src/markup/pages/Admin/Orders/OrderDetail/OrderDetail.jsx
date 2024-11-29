import React, { useEffect, useState } from "react";
import styles from "./OrderDetail.module.css";
import { useParams } from "react-router-dom";
import orderService from "../../../../../services/order.service";
const OrderDetails = () => {
  const [customer, setCustomer] = React.useState({});
  const [vehicle, setVehicle] = React.useState({});
  const [order, setOrder] = React.useState({});
  const [serviceStutus, setServiceStatus] = useState(false);
  const { order_hash } = useParams();
  const [services, setServices] = useState([]);
  //A function to get the order info
  const fetchOrder = async () => {
    const response = orderService
      .getSingleOrder(order_hash)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setOrder(data?.singleOrder[0]);
      });
  };

  useEffect(() => {
    services?.every((service) => {
      return service.service_completed === 1
        ? setServiceStatus(true)
        : setServiceStatus(false);
    });
    fetchOrder();
    setServices(order?.order_services);
  }, [order, services]);
  console.log(order);
  console.log(services);
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <section className={styles.inner_container}>
        <header className={"contact-section"}>
          <div className="auto-container">
            <div className={styles.statusContainer}>
              <div className="contact-title">
                <h2>
                  {order?.customer_first_name} {order?.customer_last_name}
                </h2>
              </div>
              <span>
                {serviceStutus ? (
                  <span className={styles.completed}>Completed</span>
                ) : (
                  <span className={styles.serviceStatus}>In progress</span>
                )}
              </span>
            </div>
          </div>
          <p className={styles.description}>
            You can track the progress of your order using this page. We will
            constantly update this page to let you know how we are progressing.
            As soon as we are done with the order, the status will turn green.
            That means your car is ready for pickup.
          </p>
        </header>

        {/* Customer and Vehicle Information */}
        <div className={styles.infoContainer}>
          <div className={styles.customerInfo}>
            <p>SERVICE</p>
            <h3 className={styles.customerHeader}>
              {order?.customer_first_name} {order?.customer_last_name}
            </h3>
            <p className={styles.customerText}>
              <span>Email: {order?.customer_email}</span>
            </p>
            <p className={styles.customerText}>
              <span>Phone Number: {order?.customer_phone_number}</span>
            </p>
            <p className={styles.customerText}>
              <span>Active Customer: </span>{" "}
              {order?.active_customer_status === 1 ? "Yes" : "No"}
            </p>
          </div>
          <div className={styles.vehicleInfo}>
            <p>CAR IN SERVICE</p>
            <h2 className={styles.customerHeader}>
              {order?.vehicle_make}({order?.vehicle_color})
            </h2>
            <p>Vehicle Tag: {order?.vehicle_tag}</p>
            <p>Vehicle Year: {order?.vehicle_year}</p>
            <p>Vehicle Mileage: {order?.vehicle_mileage}</p>
          </div>
        </div>

        {/* Services Section */}
        <div className={styles.servicesSection}>
          <h2 className={styles.serviceHeader}>Requested Service</h2>
          <ul className={styles.serviceList}>
            {services?.map((service, i) => (
              <li key={i} className={styles.serviceItem}>
                <div className={styles.serviceDetails}>
                  <h2 className={styles.serviceName}>
                    {service?.service_name}
                  </h2>
                  <p className={styles.serviceDescription}>
                    {service?.service_description}
                  </p>
                </div>
                <span>
                  {service?.service_completed === 0 ? (
                    <span className={styles.serviceStatus}>In progress</span>
                  ) : (
                    <span className={styles.completed}>Completed</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
