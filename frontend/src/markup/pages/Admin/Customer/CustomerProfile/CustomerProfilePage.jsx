import React from 'react'
import SideBar from '../../../../components/Admin/SIdeBar/SideBar'
import CustomerProfile from '../../../../components/Admin/Customer/CustomerProfile/CustomerProfile'

function CustomerProfilePage() {
  return (
    <>
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <SideBar />
        </div>
        <div className="col-md-9">
          <CustomerProfile/>
        </div>
      </div>
    </div>
    </>
  )
}

export default CustomerProfilePage