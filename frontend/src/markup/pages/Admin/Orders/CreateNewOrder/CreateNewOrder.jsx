import React from "react";
import SideBar from "../../../../components/Admin/SIdeBar/SideBar"
import CreateNewOrder from "../../../../components/Admin/Orders/CreateNewOrder/CreateNewOrder";
function CreateNewOrderPage() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <SideBar />
        </div>
        <div className="col-md-9">
          <CreateNewOrder />
        </div>
      </div>
    </div>
  );
}

export default CreateNewOrderPage;
