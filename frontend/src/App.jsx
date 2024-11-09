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
function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-employee" element={<Addemployee />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
