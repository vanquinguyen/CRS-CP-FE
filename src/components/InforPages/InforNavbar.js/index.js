import classNames from "classnames/bind";
import styles from "./InforNavbar.module.scss";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PAGE_URLS } from "../../../constants";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const infor = {
  name: "Ngoc Trinh  ",
  role: "User",
  avatar: "",
};

function InforNavbar(props) {
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState({
    imglink: infor.avatar
      ? infor.avatar
      : "https://cdn-icons-png.flaticon.com/512/147/147144.png",
  });
  const [role, setRole] = useState(auth.role);
  const [report, setReport] = useState(
    role == "driver" ? "Report Revenue" : ""
  );
  const [inforRender, setInforRender] = useState(false);
  const [repotRender, setrepotRender] = useState(false);
  const [historyRender, sethistoryRender] = useState(false);

  const [history, setHistory] = useState(
    role == "user"
      ? "Booking History"
      : role == "driver"
      ? "Trip history"
      : "Errorr"
  );

  function RenderTag(component) {
    if (component.content == history) {
      return (
        <div
          id="infor-options"
          className={
            cx("infor-options-css") +
            " " +
            `${historyRender ? "active-infor" : ""}`
          }
          onClick={(e) => NavigateOptions(e)}
        >
          {component.content}
        </div>
      );
    }
    if (component.content == report) {
      return (
        <div
          id="infor-options"
          className={
            cx("infor-options-css") +
            " " +
            `${repotRender ? "active-infor" : ""}`
          }
          onClick={(e) => NavigateOptions(e)}
        >
          {component.content}
        </div>
      );
    } else {
      return <></>;
    }
  }
  function NavigateOptions(event) {
    if (
      event.target.textContent == "Trip history" ||
      event.target.textContent == "Booking History"
    ) {
      sethistoryRender(true);
      setrepotRender(false);
      setInforRender(false);
      if (event.target.textContent == "Trip history") {
        props.props("triphistory");
      }
      if (event.target.textContent == "Booking History") {
        props.props("bookinghistory");
      }
    }
    if (event.target.textContent == "Report Revenue") {
      sethistoryRender(false);
      setrepotRender(true);
      setInforRender(false);
      if (event.target.textContent == "Report Revenue") {
        props.props("Report Revenue");
      }
    }
  }
  function toggeInfro(params) {
    if (inforRender == true) {
      return setInforRender(false);
    }
    props.props("profile");

    setInforRender(true);
    sethistoryRender(false);
    setrepotRender(false);
  }
  function Navigate(event) {
    // console.log(event.target);
    if (event.target.textContent == "Address") {
      props.props("address");
    }
    if (event.target.textContent == "Profile") {
      props.props("profile");
    }

    if (event.target.textContent == "Change Password") {
      props.props("changepassword");
    }
    if (event.target.textContent == "Profile") {
      navigate(`${PAGE_URLS.INFOR}`);
    }
    document.querySelectorAll("#wapperInfor-ul li").forEach((param) => {
      if (param == event.target) {
        event.target.classList.add("active-infor-li");
      } else {
        if (param.classList.contains("active-infor-li")) {
          param.classList.remove("active-infor-li");
        }
      }
    });
  }
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar({ imglink: reader.result });
        props.avatar({ imglink: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("avatar")}
        style={{ backgroundImage: `url("${avatar.imglink}")` }}
      ></div>
      <input
        type="file"
        name="img-upload"
        id="input"
        accept="image/*"
        onChange={imageHandler}
      />
      <label htmlFor="input" className="images-upload">
        <i className={cx("icon")}>
          <FaPlusCircle />
        </i>
      </label>
      <div className={cx("wrapper-content")}>
        <div className={cx("name-infor")}>{auth.name}</div>
        <div className={cx("role-infor")}>{role}</div>
        <div className={cx("wapperInfor")}>
          <span
            className={
              cx("infor-options-css") +
              " " +
              `${inforRender ? "active-infor" : ""}`
            }
            onClick={(e) => toggeInfro(e)}
          >
            Information
          </span>
          <ul
            id="wapperInfor-ul"
            className={cx("wapperInfor-ul")}
            style={{ display: inforRender ? "block" : "none" }}
          >
            <li
              className={cx("litag") + " " + "active-infor-li"}
              onClick={(e) => Navigate(e)}
            >
              Profile
            </li>
            <li className={cx("litag")} onClick={(e) => Navigate(e)}>
              Change Password
            </li>
          </ul>

          <RenderTag content={report} />
        </div>
      </div>
    </div>
  );
}

export default InforNavbar;
