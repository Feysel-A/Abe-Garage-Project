import React from "react";
import SideBar from "../../../components/Admin/SIdeBar/SideBar";
import AddEmployeeForm from "../../../components/Admin/AddEmployeeForm/AddEmployeeForm";

function AddEmployee() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <SideBar />
          </div>
          <div className="col-md-9">
            <AddEmployeeForm/>
          </div>
        </div>
      </div>
      </>
  );
}

export default AddEmployee;
