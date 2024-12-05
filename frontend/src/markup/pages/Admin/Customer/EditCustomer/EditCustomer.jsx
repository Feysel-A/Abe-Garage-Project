import React from 'react'
import SideBar from  "../../../../components/Admin/SIdeBar/SideBar" 
import EditCustomer from '../../../../components/Admin/Customer/EditCustomer/EditCustomer'
function EditCustomerPage() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <SideBar />
        </div>
        <div className="col-md-9">
          <EditCustomer/>
        </div>
      </div>
    </div>
  )
}

export default EditCustomerPage