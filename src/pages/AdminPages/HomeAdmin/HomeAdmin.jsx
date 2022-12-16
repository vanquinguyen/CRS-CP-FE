import Chart from "../../../components/AdminPage/Dashboard/Chart/Chart";
import Feature from "../../../components/AdminPage/Dashboard/Feature/Feature";
import Widget from "../../../components/AdminPage/Dashboard/Widget/Widget";
import Navbar from "../../../components/AdminPage/Navbar/Navbar";
import Sidebar from "../../../components/AdminPage/Sidebar/Sidebar";

import "./HomeAdmin.scss";

const HomeAdmin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="homeContainer">
        <Navbar title={"Dashboard"} />
        <div className="widgets">
          <Widget type="users" />
          <Widget type="orders" />
          <Widget type="earnings" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Feature />
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
