import React from "react";
import SideBar from "../../../../components/Admin/SIdeBar/SideBar";
import AddCustomer from "../../../../components/Admin/Customer/AddCustomer/AddCustomer";
function AddCustomerPage() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <SideBar />
        </div>
        <div className="col-md-9">
          <AddCustomer />
        </div>
      </div>
    </div>
  );
}

export default AddCustomerPage;
