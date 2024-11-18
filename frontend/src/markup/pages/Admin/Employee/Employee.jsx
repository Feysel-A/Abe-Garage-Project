import React from "react";
import SideBar from "../../../components/Admin/SIdeBar/SideBar";
import EmployeeList from "../../../components/Admin/EmployeeList/EmployeeList";
function Employee() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <SideBar />
        </div>
        <div className="col-md-9">
          <EmployeeList />
        </div>
      </div>
    </div>
  );
}

export default Employee;
