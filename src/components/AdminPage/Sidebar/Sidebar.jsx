import "./Sidebar.scss";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GroupIcon from "@mui/icons-material/Group";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = async () => {
    //do something call api logout
    const payload = {
      userId: user.userId,
      refreshToken: user.refreshToken,
      email: user.email,
    };

    await axios
      .post("http://localhost:5000/api/authenticate/logout/", payload)
      .then(() => {
        dispatch(
          setAuth({
            id: "",
            name: "",
            email: "",
            avatarUrl: "",
            role: "",
          })
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Vastum</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN MENU</p>
          <li onClick={() => navigate("/admin")}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS MENU</p>
          <li onClick={() => navigate("/admin/user")}>
            <GroupIcon className="icon" />
            <span>Users</span>
          </li>
          <li onClick={() => navigate("/admin/driver")}>
            <LocalTaxiIcon className="icon" />
            <span>Drivers</span>
          </li>

          <p className="title">OTHER MENU</p>
          <li onClick={() => navigate("/admin/ticket")}>
            <QueryStatsIcon className="icon" />
            <span>Ticket</span>
          </li>
          <li onClick={() => navigate("/admin/acceptdriver")}>
            <CarCrashIcon className="icon" />
            <span>Request driver</span>
          </li>
          <li onClick={() => navigate("/admin/notification")}>
            <NotificationsIcon className="icon" />
            <span>Notifications</span>
          </li>

          <p className="title">ACCOUNT</p>
          <li>
            <PersonIcon className="icon" />
            <span>Profile</span>
          </li>
          <li
            onClick={() => {
              logOut();

              navigate("/login");
            }}
          >
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
