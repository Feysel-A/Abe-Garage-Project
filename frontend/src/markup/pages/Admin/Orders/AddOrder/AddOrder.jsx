import React from "react";
import SideBar from "../../../../components/Admin/SIdeBar/SideBar";
import AddOrder2 from "../../../../components/Admin/Orders/AddOrder2/AddOrder2";

function AddOrderPage() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <SideBar />
          </div>
          <div className="col-md-9">
            <AddOrder2 />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddOrderPage;
