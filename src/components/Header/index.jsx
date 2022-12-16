import { BellOutlined, LogoutOutlined, SmileOutlined } from "@ant-design/icons";
import { Avatar, Col, Dropdown, Menu, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/slices/authSlice";
import axios from "axios";
import "./index.scss";

const MENU_HEADER_ITEMS = [
  // { label: "See car", key: "1" },
  // { label: "Book car", key: "2" },
  // { label: "History", key: "3" },
];

// const notifications = [
//   {
//     id: "123123",
//     title: "Payment route successfully",
//     isNew: true,
//     date: "29/2/2022",
//     avatar:
//       "https://winaero.com/blog/wp-content/uploads/2017/02/Settings-Gear-icon.png",
//     content:
//       "Ban da thanh toanf thanh cong cho ma don #786358, chuyen di tuw da nang di thanh pho ho chi minh bat dau vao lucs 6:00, vui long den dung gio",
//   },
//   {
//     id: "123123asdsa",

//     title: "Payment route failed",
//     isNew: false,
//     date: "29/2/2021",
//     avatar:
//       "https://winaero.com/blog/wp-content/uploads/2017/02/Settings-Gear-icon.png",
//     content:
//       "Ban da thanh toanf that bai cho ma don #786358, vui long thu laji",
//   },
// ];

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  function onClickLogin() {
    navigate("/login");
  }
  function Home(params) {
    navigate("/");
  }

  const onClickRegister = () => {
    navigate("/navigateRegister");
  };

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

  const menu = (
    <Menu
      items={[
        {
          key: "#das",
          label: (
            <div
              style={{
                fontSize: "22px",
                fontWeight: "500",
                textAlign: "center",
                padding: "10px",
              }}
            >
              Notification ({notifications.filter((item) => item.isNew).length})
            </div>
          ),
        },
        {
          type: "divider",
        },
        ...notifications.map((item) => {
          return {
            key: item.id,
            label: (
              <div
                className="notification"
                style={{ display: "flex", padding: "8px" }}
              >
                <div
                  className="notification_avatar"
                  style={{ marginRight: "16px" }}
                >
                  <img src={item.avatar} alt="" height={60} width={60} />
                </div>
                <div className="notification_main">
                  <div
                    className="notification_main_title"
                    style={{ fontSize: "20px", fontWeight: "500" }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="notification_main_title"
                    style={{
                      width: "300px",
                      marginTop: "10px",
                      marginBottom: "10px",
                      fontSize: "14px",
                    }}
                  >
                    {item.content}
                  </div>
                  <div
                    className="notification_main_date"
                    style={{
                      color: "#6c6c6c",
                    }}
                  >
                    {item.date}
                  </div>
                </div>
              </div>
            ),
          };
        }),
      ]}
    />
  );

  const getNoti = async () => {
    const payload = { userId: auth.id };
    const res = await axios.post(
      "http://localhost:5000/api/booking/getNotification",
      payload
    );
    const data = res.data.data.map((item) => {
      return {
        ...item,
        isNew: true,
      };
    });

    setNotifications(data);
  };

  const menuAvatar = (
    <Menu
      onClick={({ key }) => {
        if (key === "1") {
          navigate("/inforPage");
        }
        if (key === "2") {
          navigate("/historypage");
        }
      }}
      items={[
        {
          label: "Information",
          key: "1",
          style: { padding: "16px" },
        },
        {
          label: "History",
          key: "2",
          style: { padding: "16px" },
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link to={"/"} onClick={() => logOut()} style={{ padding: "6px" }}>
              Log out
              <LogoutOutlined style={{ marginLeft: "12px" }} />
            </Link>
          ),
          key: "3",
        },
      ]}
    />
  );
  return (
    <Row style={{ backgroundColor: "black" }} justify="center">
      <Row
        style={{
          backgroundColor: "black",
          height: "60px",
          display: "flex",
        }}
        className="container"
        align="middle"
      >
        <Col
          span={3}
          className="main-logo"
          onClick={() => {
            navigate("/");
          }}
        >
          Vastum
        </Col>
        <Col span={13} className="header-menu">
          {MENU_HEADER_ITEMS.map((item) => (
            <div className="header-menu-item" key={item.key}>
              {item.label}
            </div>
          ))}
        </Col>
        <Col span={5} offset={3} className="header-avatar">
          {auth.id ? (
            <>
              <div
                className="header-avatar-notification "
                onClick={(e) => {
                  getNoti();
                  e.preventDefault();
                }}
              >
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  placement="bottomRight"
                  overlayStyle={{ paddingTop: "10px" }}
                >
                  <BellOutlined className="header-avatar-notification--active" />
                </Dropdown>
              </div>
              <Dropdown
                overlay={menuAvatar}
                trigger={["click"]}
                placement="bottomLeft"
                overlayStyle={{ paddingTop: "10px" }}
              >
                <div
                  className="header-avatar-name"
                  onClick={(e) => e.preventDefault()}
                >
                  {auth.name}
                </div>
              </Dropdown>
            </>
          ) : (
            <>
              <div className="header-avatar-login" onClick={onClickLogin}>
                Login
              </div>
              <div className="header-avatar-signup" onClick={onClickRegister}>
                Sign up
              </div>
            </>
          )}
        </Col>
      </Row>
    </Row>
  );
};

export default Header;
