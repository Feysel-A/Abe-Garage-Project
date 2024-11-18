import React from 'react'
import  SideBar from "../../../components/Admin/SIdeBar/SideBar"
import UpdateEmployee from "../../../components/Admin/Update/UpdateEmployee/UpdateEmployee"
function UpdateEmployeePage() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <SideBar />
        </div>
        <div className="col-md-9">
          <UpdateEmployee/>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployeePage
