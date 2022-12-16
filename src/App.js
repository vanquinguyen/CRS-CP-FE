// import { DatePicker } from "antd";
import { Spin } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { PAGE_URLS } from "./constants/index";
import HomeAdmin from "./pages/AdminPages/HomeAdmin/HomeAdmin";
import ManageDriverPage from "./pages/AdminPages/ManageDriverPage";
import ManageUserPage from "./pages/AdminPages/ManageUserPage";
import NotificationPage from "./pages/AdminPages/NotificationPage";
import RequestDriverPage from "./pages/AdminPages/RequestDriverPage";
import TicketManagerPage from "./pages/AdminPages/TicketManagePage";
import BookDriver from "./pages/BookDriver";
import BuyTicket from "./pages/BuyTicket";
import Historypages from "./pages/Historypages";
import Home from "./pages/Home";
import InforUserPage from "./pages/Inforpages/InforUserpages";
import Login from "./pages/Loginpasges/Login";
import NavigateRegisterPage from "./pages/NavigatePages/NavigateRegisterPage";
import OTPpages from "./pages/OTPpages";
import RegisterDriver from "./pages/RegisterDriver";
import Register from "./pages/Registerpages/Register";
import { setAuth } from "./redux/slices/authSlice";
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

moment.locale("vi");

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const getToken = async () => {
      const payload = {
        refreshToken: user.refreshToken,
        email: user.email,
      };

      const headers = {
        "Content-Type": "application/json",
        authorization: "Bearer " + user.accessToken,
      };

      await axios
        .post("http://localhost:5000/api/authenticate/token/", payload, {
          headers: headers,
        })
        .then((res) => {
          if (res.data.status === "OK") {
            dispatch(
              setAuth({
                id: user.userId,
                name: user.name,
                email: user.email,
                role: user.authInfo,
                phone: user.phoneNumber,
              })
            );
            return;
          }

          if (res.data.accessToken) {
            user.accessToken = res.data.accessToken;
            user.refreshToken = res.data.refreshToken;
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(
              setAuth({
                id: user.userId,
                name: user.name,
                email: user.email,
                role: user.authInfo,
                phone: user.phoneNumber,
              })
            );
            return;
          }
        })
        .catch((error) => {
          console.log(error.message);
        });

      setIsLoading(false);
    };
    if (user) {
      getToken();
    }
  }, []);

  return (
    <div className="App">
      {!isLoading ? (
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute id={auth.id} role={auth.role} />}>
              <Route path={PAGE_URLS.LOGIN} element={<Login />} />
              <Route path={PAGE_URLS.REGISTER} element={<Register />} />
              <Route
                path={PAGE_URLS.REGISTER_DRIVER}
                element={<RegisterDriver />}
              />
              <Route path={PAGE_URLS.HOMEPAGE} element={<Home />} />
              <Route path={PAGE_URLS.BUY_TICKET} element={<BuyTicket />} />

              <Route
                path={PAGE_URLS.NAVIGATE_REGIS}
                element={<NavigateRegisterPage />}
              />
              <Route path={PAGE_URLS.OTP} element={<OTPpages />} />
            </Route>
            <Route
              element={
                <ProtectedRoute role={auth.role} acceptRole={"driver"} />
              }
            >
              <Route path={PAGE_URLS.BOOK_DRIVER} element={<BookDriver />} />
            </Route>
            <Route
              element={<ProtectedRoute role={auth.role} acceptRole={"admin"} />}
            >
              <Route path={PAGE_URLS.ADMIN}>
                <Route index element={<HomeAdmin />} />
                <Route path="user">
                  <Route index element={<ManageUserPage />} />
                </Route>
                <Route path="driver">
                  <Route index element={<ManageDriverPage />} />
                </Route>
                <Route path="acceptdriver">
                  <Route index element={<RequestDriverPage />} />
                </Route>
                <Route path="ticket">
                  <Route index element={<TicketManagerPage />} />
                </Route>
                <Route path="notification">
                  <Route index element={<NotificationPage />} />
                </Route>
              </Route>
            </Route>

            <Route element={<PrivateRoute id={auth.id} />}>
              <Route path={PAGE_URLS.INFOR} element={<InforUserPage />} />
            </Route>
            <Route element={<PrivateRoute id={auth.id} />}>
              <Route path={PAGE_URLS.HISTORY} element={<Historypages />} />
            </Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "40vh",
          }}
        >
          <Spin tip="Loading..." size="large"></Spin>
        </div>
      )}
    </div>
  );
}

export default App;
