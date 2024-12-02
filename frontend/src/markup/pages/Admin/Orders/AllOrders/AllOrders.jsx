import React from 'react'
import SideBar from "../../../../components/Admin/SIdeBar/SideBar"
import AllOrders from "../../../../components/Admin/Orders/AllOrders/AllOrders"
function Orders() {
  return (
    <div className="container-fluid admin-pages">
    <div className="row">
      <div className="col-md-3 admin-left-side">
        <SideBar />
      </div>
      <div className="col-md-9">
      <AllOrders/>
      </div>
    </div>
  </div>
  )
}

export default Orders
