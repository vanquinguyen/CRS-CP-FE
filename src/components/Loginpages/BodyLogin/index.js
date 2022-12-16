import { Button, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { setAuth } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function BodyLogin() {
  const dispatch = useDispatch();
  let location = useLocation();
  let navigate = useNavigate();
  const [prevPath, setPrevPath] = useState("");

  useEffect(() => {
    if (location.state) setPrevPath(location.state);
  }, [location]);

  const onFinish = (values) => {
    const payload = {
      email: values.Username,
      password: values.Password,
    };

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    axios
      .post("http://localhost:5000/api/authenticate/login/", payload, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.status === "FAILED") {
          console.log(res.data.message);
          return;
        }

        let data = {
          id: res.data.user.userId,
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.authInfo,
          phone: res.data.user.phoneNumber,
        };

        dispatch(setAuth(data));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        prevPath ? navigate(prevPath) : navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form")}>
        <h2 className={cx("form-title")}>LOGIN</h2>
        <Form
          className={cx("form-element")}
          name="login-form"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            className={cx("form-element-username")}
            name="Username"
            label="Input email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              suffix={<MailOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
              placeholder="Input email"
            />
          </Form.Item>
          <Form.Item
            className={cx("form-element-password")}
            label="Enter a password (required)"
            name="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              { min: 5, message: "Password must be minimum 5 characters." },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button
              type="primary"
              htmlType="submit"
              className={cx("form-element-button")}
            >
              <p className={cx("form-element-button")}>Log In</p>
            </Button>
          </Form.Item>
        </Form>
        <h2 className={cx("form-title")}>Or</h2>
        <Button type="primary" className={cx("form-element-button", "button")}>
          <img
            className={cx("button-google")}
            alt="google"
            src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/google-btn-logo-389b92241b.svg"
          ></img>
          <p className={cx("form-element-button", "button-title")}>
            Continute With Google
          </p>
        </Button>
        <p className={cx("form-to--signup")}>
          Don't have an account?
          <span
            onClick={() => {
              navigate("/navigateRegister");
            }}
            style={{ color: "#1890ff", cursor: "pointer" }}
          >
            {" "}
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default BodyLogin;
