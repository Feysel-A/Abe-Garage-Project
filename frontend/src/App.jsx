import { Route, Routes } from "react-router-dom";
import Home from "./markup/pages/Home/Home";
import Login from "./markup/pages/Login/Login";
import AddEmployee from "./markup/pages/Admin/AddEmployee/AddEmployee";
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";
//Import the custom styles
import "./assets/styles/custom.css";
import Unauthorized from "./markup/pages/Unauthorized/Unauthorized";
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import Orders from "./markup/pages/Admin/Orders/AllOrders/AllOrders";
import Customers from "./markup/pages/Admin/Customer/Customer";
import Employees from "./markup/pages/Admin/Employee/Employee";
import About from "./markup/pages/About/About";
import Contact from "./markup/pages/Contact/Contact";
import Service from "./markup/pages/Service/Service";
import Dashboard from "./markup/pages/Admin/AdminDashboard/Admin";
import UpdateEmployee from "./markup/pages/Admin/Update/UpdateEmployee";
import AddOrder from "./markup/pages/Admin/AddOrder/AddOrder";
import AddOrder2 from "./markup/pages/Admin/Orders/AddOrder/AddOrder";
import CreateNewOrder from "./markup/pages/Admin/Orders/CreateNewOrder/CreateNewOrder";
import OrderDetail from "./markup/pages/Admin/Orders/OrderDetail/OrderDetail";
import AllOrders from "./markup/pages/Admin/Orders/AllOrders/AllOrders";
import ServicePage from "./markup/pages/Admin/Service/Service";
import AddCustomer from "./markup/pages/Admin/Customer/AddCustomer/AddCustomer";
import EditCustomer from "./markup/pages/Admin/Customer/EditCustomer/EditCustomer";
import CustomerProfile from "./markup/pages/Admin/Customer/CustomerProfile/CustomerProfilePage";
import UpdateVehicle from "./markup/pages/Admin/Customer/UpdateVehicle/UpdateVehiclePage";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Service />} />
        {/* // Add the Orders Route  */}
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        {/* // Add the Customers Route  */}
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer-profile/:customer_hash"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <CustomerProfile />
            </PrivateAuthRoute>
          }
        />
        {/* // Add the Employees Route  */}
        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Employees />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Dashboard />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/update/employee/:employee_hash"
          element={
            <PrivateAuthRoute roles={[3]}>
              <UpdateEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="admin/services"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <ServicePage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddOrder />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer/:customer_hash"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddOrder2 />
            </PrivateAuthRoute>
          }
        />
        {/* Add customer service Order Page Route*/}
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/edit-customer/:customer_hash"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/edit-vehicle/:vehicle_id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <UpdateVehicle />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="admin/order/add-new-order/select-service/:customer_hash/:vehicle_id"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <CreateNewOrder />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="admin/order/:order_hash"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <OrderDetail />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <AllOrders />
            </PrivateAuthRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
