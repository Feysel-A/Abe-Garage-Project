import React, { useEffect, useState } from "react";
import vehicleService from "../../../../../services/vehicle.service";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../../Context/AuthContext";

function UpdateVehicle() {
  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");
  const [serverMsg, setServerMsg] = useState("");
  const { vehicle_id } = useParams();
  // vehicle error
  const [vehicle_error, setVehicleError] = useState("");

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";
  // destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }
  //afunction to fetch customer vehicle data
  const fetchData2 = async () => {
    try {
      const data2 = await vehicleService
        .getVehicleById(vehicle_id)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setVehicleYear(data?.vehicle_year);
          setVehicleMake(data?.vehicle_make);
          setVehicleModel(data?.vehicle_model);
          setVehicleType(data?.vehicle_type);
          setVehicleMileage(data?.vehicle_mileage);
          setVehicleTag(data?.vehicle_tag);
          setVehicleSerial(data?.vehicle_serial);
          setVehicleColor(data?.vehicle_color);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData2();
  }, []);
  async function handleSubmit(e) {
    // prevent the default behavior of the form submission
    e.preventDefault();

    // prepare the data for form submission
    const FormData = {
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    };

    try {
      const data = await vehicleService
        .updateVehicle(vehicle_id, FormData)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message) {
            setServerMsg(data.message);
            setTimeout(() => {
              setServerMsg("");
            }, 2000);
          }
        });
    } catch (error) {
      setServerMsg(error.response.data.msg);
      setTimeout(() => {
        setServerMsg("");
      }, 2000);
    }
  }
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Update Vehicle</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    {/* Vehicle Year*/}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_year"
                        placeholder="Vehicle Year"
                        value={vehicle_year}
                        onChange={(e) => setVehicleYear(e.target.value)}
                        required
                      />
                      {"firstNameRequired" && (
                        <div className="validation-error" role="alert">
                          {/* {"firstNameRequired"} */}
                        </div>
                      )}
                    </div>

                    {/* Vehicle Make*/}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_make"
                        placeholder="Vehicle Make"
                        required
                        value={vehicle_make}
                        onChange={(e) => setVehicleMake(e.target.value)}
                      />
                    </div>

                    {/* Vehicle Model */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_model"
                        placeholder="Vehicle Model"
                        required
                        value={vehicle_model}
                        onChange={(e) => setVehicleModel(e.target.value)}
                      />
                    </div>

                    {/* Vehicle Type */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_type"
                        placeholder="Vehicle Type"
                        required
                        value={vehicle_type}
                        onChange={(e) => setVehicleType(e.target.value)}
                      />
                    </div>

                    {/* Vehicle Mileage */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_mileage"
                        placeholder="Vehicle Mileage"
                        required
                        value={vehicle_mileage}
                        onChange={(e) => setVehicleMileage(e.target.value)}
                      />
                    </div>

                    {/* Vehicle Tag */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_tag"
                        placeholder="Vehicle Tag"
                        required
                        value={vehicle_tag}
                        onChange={(e) => setVehicleTag(e.target.value)}
                      />
                    </div>

                    {/* Vehicle Serial */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_serial"
                        placeholder="Vehicle Serial"
                        required
                        value={vehicle_serial}
                        onChange={(e) => setVehicleSerial(e.target.value)}
                      />
                    </div>

                    {/* Vehicle Color */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_color"
                        placeholder="Vehicle Color"
                        required
                        value={vehicle_color}
                        onChange={(e) => setVehicleColor(e.target.value)}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="form-group col-md-12">
                      <button
                        // onClick={spinner}
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Update Vehicle</span>
                      </button>
                      {serverMsg && (
                        <div
                          className="validation-error"
                          style={{
                            color: "green",
                            fontSize: "100%",
                            fontWeight: "600",
                            padding: "25px",
                          }}
                          role="alert"
                        >
                          {serverMsg}
                        </div>
                      )}
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

export default UpdateVehicle;
