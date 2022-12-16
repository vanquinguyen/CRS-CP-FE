import React from "react";
import Navbar from "../../../components/AdminPage/Navbar/Navbar";
import RequestDriver from "../../../components/AdminPage/RequestDriver";
import Sidebar from "../../../components/AdminPage/Sidebar/Sidebar";
import "./index.scss";

const RequestDriverPage = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="homeContainer">
        <Navbar title={"Request Driver"} />
        <div className="manage-user-main">
          <RequestDriver />
        </div>
      </div>
    </div>
  );
};

export default RequestDriverPage;
