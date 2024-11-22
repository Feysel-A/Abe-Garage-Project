import React from 'react'
import AddOrder from '../../../components/Admin/AddOrder/AddOrder';
import SideBar from "../../../components/Admin/SIdeBar/SideBar"
function AddOrderPage() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <SideBar />
        </div>
        <div className="col-md-9">
          <AddOrder/>
        </div>
      </div>
    </div>
  );
}

export default AddOrderPage
