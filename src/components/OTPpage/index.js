import { Col, Row } from "antd";
import React, { useState } from "react";
import styles from "./OTPpage.module.scss";
import classNames from "classnames/bind";
import { Button, Form, Input, Radio } from "antd";
import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons/lib/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

const buttonItemLayout = {
  wrapperCol: {
    span: 14,
    offset: 4,
  },
};
function OTPpage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [input, setIput] = useState();
  const [email, setEmail] = useState(location.state.user.email);

  const onFinish = (values) => {
    if (values.otp.trim().length < 6) {
      return alert("OTP code must be 6 digits");
    }

    const payload = {
      userId: location.state.user._id,
      otp: values.otp.trim(),
    };

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    axios
      .post("http://localhost:5000/api/verify/", payload, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.status === "FAILED") {
          console.log(res.data.message);
          return;
        }
        console.log(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onResendOTP = () => {
    const payload = {
      userId: location.state.user._id,
      email: location.state.user.email,
    };

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    axios
      .post("http://localhost:5000/api/verify/resendOTP/", payload, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.status === "FAILED") {
          console.log(res.data.message);
          return;
        }
        alert("Resend otp");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // const handleKeyDown = (event) => {
  //   const id = Number(event.target.id);
  //   console.log(event.target);
  //   if (event.key === "Backspace") {
  //     if (!event.target.value) {
  //       document.getElementById(`${id - 1}`).focus();
  //     }
  //   }
  // };
  // const onChange = (e) => {
  //   const id = Number(e.target.id);
  //   if (e.target.value) {
  //     if (id <= 2) {
  //       document.getElementById(`${id + 1}`).focus();
  //     }
  //   }
  // };

  return (
    <div className={cx("wrapper")}>
      <Row>
        <Col span={3} offset={1}>
          <ArrowLeftOutlined className={cx("logo-back")} />
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col span={10} className={cx("form")}>
          <Row justify={"center"}>
            <Col>
              <MailOutlined className={cx("logo-email")} />
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col span={18}>
              <h1 className={("text-center", cx("form-title"))}>
                Verify your email address to create your new Vastum account
              </h1>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col span={17}>
              <p className={cx("text-center")}>
                An email with a verification code has been sent to <br></br>
                {email}
                <br />
                Enter code here:
              </p>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={16}>
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Row justify="center">
                  <Form.Item
                    name="otp"
                    rules={[
                      {
                        required: true,
                        message: "Please input otp!",
                      },
                    ]}
                  >
                    <Input className={cx("input-otp")} maxLength={6} />
                  </Form.Item>
                </Row>

                <Form.Item
                  wrapperCol={{
                    span: 24,
                  }}
                >
                  <Row className={cx("wrapperbutton")} justify="space-between">
                    <Col>
                      <Button
                        className={cx("button-otp")}
                        onClick={onResendOTP}
                      >
                        Send a new code
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className={cx("button-otp")}
                        type="primary"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Col>

            {/* input dep hon nhung chua hoan thanh  */}
            {/* <Col className={cx("wrapper-input")}>
              <Input
                id={"1"}
                onKeyDown={handleKeyDown}
                onkeyup="doSomething(event)"
                className={cx("input1")}
                maxLength={1}
                onChange={onChange}
              />
            </Col>
            <Col className={cx("wrapper-input")}>
              <Input
                id={"2"}
                className={cx("input2")}
                maxLength={1}
                onkeyUp={handleKeyDown}
                onChange={onChange}
              />
            </Col>
            <Col className={cx("wrapper-input")}>
              <Input
                id={"3"}
                className={cx("input3")}
                maxLength={1}
                onChange={onChange}
              />
            </Col> */}
            {/* 
            <Col className={cx("wrapper-input")}>
              <Input
                className={cx("input4")}
                maxLength={1}
                onChange={onChange4}
              />
            </Col>
            <Col className={cx("wrapper-input")}>
              <Input
                className={cx("input5")}
                maxLength={1}
                onChange={onChange5}
              />
            </Col>
            <Col className={cx("wrapper-input")}>
              <Input
                className={cx("input6")}
                maxLength={1}
                onChange={onChange6}
              />
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default OTPpage;
