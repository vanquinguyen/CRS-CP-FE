import { CameraOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VietQR } from "vietqr";
import styles from "./DriverRegister.module.scss";

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

const cx = classNames.bind(styles);
function BodyRegisterDriver() {
  let navigate = useNavigate();
  const [typeCar, setTypeCar] = useState(4);
  const changeTypeCar = (value) => {
    setTypeCar(value);
  };
  const onFinish = (values) => {
    const {
      Name,
      Birthday,
      Number,
      Email,
      Password,
      Portrait,
      IdPerson,
      License,
      PhotoVehicle,
      RegistryVehicle,
      VehicleRegistration,
      Idcar,
      TypeCar
    } = values;

    console.log(values);

    const payload = {
      name: Name,
      email: Email,
      password: Password,
      phoneNumber: Number,
      birthDay: Birthday.toISOString(),
      authInfo: "driver",
      personalPortrait: Portrait[0].thumbUrl,
      citizenID: IdPerson[0].thumbUrl,
      license: License[0].thumbUrl,
      photoVehicle: PhotoVehicle[0].thumbUrl,
      registryVehicle: RegistryVehicle[0].thumbUrl,
      vehicleRegistration: VehicleRegistration[0].thumbUrl,
      idCar: Idcar,
      typeCar: TypeCar
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
  // eslint-disable-next-line react-hooks/exhaustive-deps

  let vietQR = new VietQR({
    clientID: "client_id_here",
    apiKey: "api_key_here",
  });

  // list banks are supported create QR code by Vietqr
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const res = async () => {
      vietQR
        .getBanks()
        .then((banks) => {
          banks.data.forEach((element) => {
            setOptions((options) => [...options, element.shortName]);
          });
        })
        .catch((err) => {});
    };
    res();
  }, []);
  const renderOptions = (
    <Select
      showSearch
      className={cx("form__item--input")}
      placeholder="Select a bank name"
      optionFilterProp="children"
    >
      {options.map((value) => {
        return (
          <Option key={value} value={value}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("wrapper__title")}>Drive with Vastum</h1>
      <Form
        name="RegisterDriver"
        layout="vertical"
        className={cx("form")}
        onFinish={onFinish}
      >
        <h1 className={cx("form__title")}>Account information</h1>

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
          // {...config}
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Retype Password" />
        </Form.Item>
        <h1 className={cx("form__title")}>Personal information</h1>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Citizen ID photo is required !",
            },
          ]}
          {...formItemLayout}
          className={cx("form__item beetwen")}
          name="Portrait"
          label="Personal portrait"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button
              className={cx("form__item--button")}
              icon={<CameraOutlined />}
            >
              Upload portrait
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Citizen ID photo is required !",
            },
          ]}
          {...formItemLayout}
          className={cx("form__item beetwen")}
          name="IdPerson"
          label="Citizen ID photo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button
              className={cx("form__item--button")}
              icon={<CameraOutlined />}
            >
              Upload citizen ID photo
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bank name is required !",
            },
          ]}
          {...formItemLayout}
          className={cx("form__item beetwen")}
          name="License"
          label="License Photo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button
              className={cx("form__item--button")}
              icon={<CameraOutlined />}
            >
              Upload license photo
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          layout="vertical"
          name="Bank"
          label="Bank name"
          rules={[
            {
              required: true,
              message: "Bank name is required !",
            },
          ]}
        >
          {renderOptions}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          className={cx("")}
          label="ID Bank"
          name="BankId"
          rules={[
            {
              required: true,
              message: "Bank Id is required !",
            },
          ]}
        >
          <Input
            className={cx("input-type")}
            placeholder="Input Bank ID "
            // suffix={<PhoneOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
          />
        </Form.Item>
        <h1 className={cx("form__title")}>Vehicle information</h1>
        <Form.Item
          name="Idcar"
          label="Id car "
          rules={[
            {
              required: true,
              message: "Please input your id car!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          className={cx("form__item beetwen")}
          name="TypeCar"
          label="Type car"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Select
            defaultValue={typeCar}
            style={{
              width: "100%",
            }}
            onChange={changeTypeCar}
            size="large"
          >
            <Option value={7}>7</Option>
            <Option value={4}>4</Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Photo vehicle is required !",
            },
          ]}
          {...formItemLayoutadd1col}
          className={cx("form__item beetwen")}
          name="PhotoVehicle"
          label="Photo vehicle"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button
              className={cx("form__item--button")}
              icon={<CameraOutlined />}
            >
              Upload photo vehicle
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vehicle Registration is required !",
            },
          ]}
          {...formItemLayoutadd1col}
          className={cx("form__item beetwen")}
          name="VehicleRegistration"
          label="Vehicle Registration"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button
              className={cx("form__item--button")}
              icon={<CameraOutlined />}
            >
              Upload vehicle registration
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Registry vehicle is required !",
            },
          ]}
          {...formItemLayoutadd1col}
          className={cx("form__item beetwen")}
          name="RegistryVehicle"
          label="Registry vehicle"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button
              className={cx("form__item--button")}
              icon={<CameraOutlined />}
            >
              Upload registry vehicle
            </Button>
          </Upload>
        </Form.Item>
        <p className={cx("provision")}>
          Be solely responsible for the content, images, business information
          and other information, as well as the entire transaction process with
          partners via Vastum App Commit that the information members provide to
          Grab are accurate and complete and keep the member's information on
          the Vastum App up to date, accurate and complete.
        </p>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button
            className={cx("button-sig-regis fixbutoon")}
            type="primary"
            htmlType="submit"
          >
            <p className="button">REGISTER</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BodyRegisterDriver;

const formItemLayout = {
  labelCol: {
    span: 11,
  },
  wrapperCol: {
    span: 20,
  },
};
const formItemLayoutadd1col = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 20,
  },
};

const normFile = (e) => {

  if (Array.isArray(e)) {
    return e;
  }

  if (Number.isInteger(e)) {
    return e;
  }

  return e?.fileList;
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};
