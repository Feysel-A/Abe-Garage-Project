import React from "react";
import SideBar from "../../../components/Admin/SIdeBar/SideBar"
import Service from "../../../components/Admin/Service/Service" 
function ServicePage() {
  return <div className="container-fluid admin-pages">
  <div className="row">
    <div className="col-md-3 admin-left-side">
      <SideBar />
    </div>
    <div className="col-md-9">
     <Service/>
    </div>
  </div>
</div>
}

export default ServicePage;
