import React from "react";
import Navbar from "../../../components/AdminPage/Navbar/Navbar";
import Notification from "../../../components/AdminPage/Notification";
import Sidebar from "../../../components/AdminPage/Sidebar/Sidebar";
import "./index.scss";

const NotificationPage = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="homeContainer">
        <Navbar title={"Notification"} />
        <div className="notification-main">
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
