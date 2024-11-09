import React from "react";
import SideBar from "../../../components/Admin/SIdeBar/SideBar";
import Addemployee from "../../../components/Admin/AddEmployee/AddEmployee";

function AddEmployee() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <Addemployee />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
