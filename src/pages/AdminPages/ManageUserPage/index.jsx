import React from "react";
import ManageUser from "../../../components/AdminPage/ManageUser";
import Navbar from "../../../components/AdminPage/Navbar/Navbar";
import Sidebar from "../../../components/AdminPage/Sidebar/Sidebar";
import "./index.scss";

const ManageUserPage = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="homeContainer">
        <Navbar title={"Manage user"} />
        <div className="manage-user-main">
          <ManageUser />
        </div>
      </div>
    </div>
  );
};

export default ManageUserPage;
