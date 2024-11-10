import { Route, Routes } from "react-router-dom"
import Home from "./markup/pages/Home/Home"
import Login from "./markup/pages/Login/Login"
import Addemployee from "./markup/pages/Admin/AddEmployee/Addemployee"
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import "./assets/styles/custom.css"
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";
//Import the custom styles
import './assets/styles/custom.css'
import Unauthorized from "./markup/pages/Unauthorized/Unauthorized";
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import Orders from "./markup/pages/Admin/Orders/Orders";
import Customers from  "./markup/pages/Admin/Customer/Customer"
import Employees from "./markup/components/Admin/Employee/Employee";
import About from "./markup/pages/About/About";
import Contact from "./markup/pages/Contact/Contact";
import Service from "./markup/pages/Service/Service";
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
        {/* // Add the Employees Route  */}
        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Employees />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Addemployee />
            </PrivateAuthRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App
