import React from "react";
import ManageDriver from "../../../components/AdminPage/ManageDriver";
import Navbar from "../../../components/AdminPage/Navbar/Navbar";
import Sidebar from "../../../components/AdminPage/Sidebar/Sidebar";
import "./index.scss";

const ManageDriverPage = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="homeContainer">
        <Navbar title={"Manage driver"} />
        <div className="manage-driver-main">
          <ManageDriver />
        </div>
      </div>
    </div>
  );
};

export default ManageDriverPage;
