import React from 'react'
import SideBar from '../../../components/Admin/SIdeBar/SideBar';
import Dashboard from '../../../components/Admin/Dashboard/Dashboard';
function Admin() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <SideBar />
          </div>
          <div className="col-md-9">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin
