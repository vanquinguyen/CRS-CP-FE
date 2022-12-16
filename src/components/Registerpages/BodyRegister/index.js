import classNames from "classnames/bind";
import styles from "./BodyLogin.module.scss";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const { Option } = Select;
const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

function BodyRegister() {
  let navigate = useNavigate();

  const onFinish = async (values) => {
    handleRegis(values);
  };

  const handleRegis = (values) => {
    const { Name, Birthday, Number, Email, Password } = values;
    const DatePicker = Birthday.format("YYYY-MM-DD");
    console.log(
      `Name:${Name} / Birthday:${DatePicker}/ Phonenumber :${Number}/ Email:${Email}/ Password:${Password}`
    );
    const payload = {
      name: Name,
      email: Email,
      password: Password,
      phoneNumber: Number,
      birthDay: Birthday,
      authInfo: "user",
    };

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    axios
      .post("http://localhost:5000/api/authenticate/signup/", payload, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.status === "FAILED") {
          console.log(res.data.message);
          return;
        }

        let user = res.data.data;
        navigate("/otpPage", {
          state: {
            user: user,
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h1 className={cx("header-element")}>Register with Vastum</h1>
        <Form
          className={cx("wrapper-form")}
          name="register-form"
          layout="vertical"
          onFinish={onFinish}
          wrapperCol={{
            span: 24,
          }}
        >
          <Form.Item className={cx("wrapper-fullname")}>
            <Form.Item
              className={cx("form-name", "form-label")}
              label="Full Name (required)"
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your full name ",
                },
              ]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>
            <Form.Item
              className={cx("form-date", "form-label")}
              name="Birthday"
              label="Birth day (required)"
              {...config}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              className={cx("form-number", "form-input", "form-label")}
              label="Phone Number (required)"
              name="Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number",
                },
              ]}
            >
              <Input
                placeholder="Phone Number"
                suffix={<PhoneOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
              />
            </Form.Item>
            <Form.Item
              className={cx("form-email", "form-label")}
              name="Email"
              label="E-mail"
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
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              className={cx("form-password", "form-label")}
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
            <Form.Item
              className={cx("form-password", "form-label")}
              label="Retype a password (required)"
              name="RetypePassword"
              rules={[
                {
                  required: true,
                  message: "Please retype your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("Password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Retype Password" />
            </Form.Item>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button
              type="primary"
              htmlType="submit"
              className="button-sig-regis"
            >
              <p className="button">REGISTER</p>
            </Button>
          </Form.Item>
          <p className={cx("hdsd")}>
            By clicking "Sign Up", you agree to Uber's Terms of Use and
            acknowledge you have read the Privacy Policy. You also consent to
            receive calls or SMS messages, including by automated dialer, from
            Uber and its affiliates to the number you provide for informational
            and/or marketing purposes. Consent to receive marketing messages is
            not a condition to use Uber’s services. You understand that you may
            opt out by texting “STOP” to 89203.
          </p>
        </Form>
      </div>
    </div>
  );
}

export default BodyRegister;

// -----------------validate name -------------------
// rules={[
//   { required: true, message: 'Please input the name of your new store' },
//   ({ getFieldValue }) => ({
//     validator() {
//       if (hasNumber(getFieldValue('name'))) {
//         return Promise.reject(new Error("Names cannot contain numbers"))
//       }
//       return Promise.resolve();
//     }
//   }),
// ]}
