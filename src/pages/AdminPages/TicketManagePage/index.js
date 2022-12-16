import React from "react";
import Navbar from "../../../components/AdminPage/Navbar/Navbar";
import TicketManager from "../../../components/AdminPage/TicketManager";
import Sidebar from "../../../components/AdminPage/Sidebar/Sidebar";
import "./index.scss";

const TicketManagerPage = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="homeContainer">
        <Navbar title={"Ticket Manager"} />
        <div className="manage-user-main">
          <TicketManager />
        </div>
      </div>
    </div>
  );
};

export default TicketManagerPage;
