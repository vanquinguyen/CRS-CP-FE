import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Navbar.scss";
import { Dropdown, Menu } from "antd";

const NOTIFICATIONS = [
  {
    id: "123123",
    title: "Payment route successfully",
    isNew: true,
    date: "29/2/2022",
    avatar:
      "https://winaero.com/blog/wp-content/uploads/2017/02/Settings-Gear-icon.png",
    content:
      "Ban da thanh toanf thanh cong cho ma don #786358, chuyen di tuw da nang di thanh pho ho chi minh bat dau vao lucs 6:00, vui long den dung gio",
  },
  {
    id: "123123asdsa",

    title: "Payment route failed",
    isNew: false,
    date: "29/2/2021",
    avatar:
      "https://winaero.com/blog/wp-content/uploads/2017/02/Settings-Gear-icon.png",
    content:
      "Ban da thanh toanf that bai cho ma don #786358, vui long thu laji",
  },
];
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
            Notification ({NOTIFICATIONS.filter((item) => item.isNew).length})
          </div>
        ),
      },
      {
        type: "divider",
      },
      ...NOTIFICATIONS.map((item) => {
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

const Navbar = ({ title }) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">{title}</div>
        <div className="items">
          <div className="item">
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
              overlayStyle={{ paddingTop: "10px" }}
            >
              {NOTIFICATIONS.length ? (
                <div>
                  <NotificationsIcon className="icon" />
                  <div className="counter">{NOTIFICATIONS.length}</div>
                </div>
              ) : (
                <NotificationsIcon className="icon" />
              )}
            </Dropdown>
          </div>
          <div className="item">
            <img
              src="https://www.iriset.in/tms/uploads/profile/profile.png"
              alt="user"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
