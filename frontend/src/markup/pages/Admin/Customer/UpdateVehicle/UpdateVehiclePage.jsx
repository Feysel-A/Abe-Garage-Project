import React from "react";
import SideBar from "../../../../components/Admin/SIdeBar/SideBar";
import UpdateVehicle from "../../../../components/Admin/Customer/UpdateVehicle/UpdateVehicle";

function AddOrderPage() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <SideBar />
          </div>
          <div className="col-md-9">
            <UpdateVehicle />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddOrderPage;
