import { Row, Col, Button, Form, Input, Select, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ContentInforUserPages.module.scss";
import { FaInfo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../redux/slices/authSlice";
import { CameraOutlined } from "@ant-design/icons";
const { Option } = Select;

const cx = classNames.bind(styles);
// const infor = {
//   name: "Ngoc Trinh  ",
//   role: "customer",
//   avatar: "",
//   gender: 1,
//   email: "ngoctrinhvippro@gmail.com",
//   phonenumber: "123123123",
// };
const infor = {
  name: "Ngoc Trinh  ",
  role: "driver",
  avatar: "",
  gender: 1,
  email: "ngoctrinhvippro@gmail.com",
  phonenumber: "123123123",
  status_active: 1,
  type_car: 7,
  id_car: "47h1-123.45",
  img_portrait:
    "https://mruffalo.com/wp-content/uploads/2021/04/Hanyu-Arisa-My-nhan-JAV-voi-body-goi-tinh-kho-cuong-6.jpg",
  img_citizen_id:
    "https://mruffalo.com/wp-content/uploads/2021/04/Hanyu-Arisa-My-nhan-JAV-voi-body-goi-tinh-kho-cuong-6.jpg",
  img_license:
    "https://mruffalo.com/wp-content/uploads/2021/04/Hanyu-Arisa-My-nhan-JAV-voi-body-goi-tinh-kho-cuong-6.jpg",
  img_vehicle:
    "https://mruffalo.com/wp-content/uploads/2021/04/Hanyu-Arisa-My-nhan-JAV-voi-body-goi-tinh-kho-cuong-6.jpg",
  img_registration_car:
    "https://mruffalo.com/wp-content/uploads/2021/04/Hanyu-Arisa-My-nhan-JAV-voi-body-goi-tinh-kho-cuong-6.jpg",
  img_registry_car:
    "https://mruffalo.com/wp-content/uploads/2021/04/Hanyu-Arisa-My-nhan-JAV-voi-body-goi-tinh-kho-cuong-6.jpg",
};

function ContentInforUserPages(setNameNav) {
  const changeVehicle = (values) => {
    const {
      Portrait,
      IdPerson,
      License,
      PhotoVehicle,
      RegistryVehicle,
      VehicleRegistration,
    } = values;
  };
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    status_active,
    name,
    role,
    avatar,
    email,
    phonenumber,
    gender,
    type_car,
    img_portrait,
    img_citizen_id,
    img_license,
    img_vehicle,
    img_registration_car,
    img_registry_car,
    id_car,
  } = infor;
  console.log(img_citizen_id);
  const [statusState, setStatusState] = useState(status_active);
  const [nameState, setNameState] = useState(auth.name);
  const [emailState, setEmailState] = useState(auth.email);
  const [phonelState, setPhonelState] = useState(auth.phone);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [typeCar, setTypeCar] = useState(type_car);
  const changeTypeCar = (value) => {
    setTypeCar(value);
  };
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(
      setAuth({
        ...auth,
        name: values.nameForm,
        phone: values.phoneForm,
        email: values.emailForm,
      })
    );
  };

  //modal
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //render status driver
  const RenderStatus = () => {
    if (auth.role == "driver") {
      return (
        <Form.Item label="Practicing Certificate:">
          <div
            style={{
              color:
                statusState === 1
                  ? "green"
                  : statusState === -1
                  ? "red"
                  : "yellow",
            }}
          >
            <Row>
              <Col offset={1}>
                <p className={cx("status-title")}>
                  {statusState === 1
                    ? "Succes"
                    : statusState === -1
                    ? "Fail"
                    : "Waiting Process"}
                </p>
              </Col>
              <Col offset={1}>
                <FaInfo
                  className={cx("icon-modal")}
                  onClick={showModal}
                ></FaInfo>
              </Col>
            </Row>
          </div>
        </Form.Item>
      );
    }
    if (auth.role == "customer") {
      return <></>;
    }
  };

  // prefix phone number

  return (
    <div className={cx("wrapper")}>
      <Row>
        <Col offset={1}>
          <div style={{ marginTop: "22px" }}>
            <h2 className={cx("title")}>My Profile</h2>
            <p className={cx("mini-title")}>
              Manage profile information for account security
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={22} offset={1}>
          <div className="line"> </div>
        </Col>
      </Row>
      <Row>
        <Col offset={1} span={23}>
          <Form
            {...layout}
            layout="horizontal"
            form={form}
            name="profileForm"
            onFinish={onFinish}
            initialValues={{
              prefix: "83",
              nameForm: nameState,
              emailForm: emailState,
              phoneForm: phonelState,
            }}
            labelAlign="right"
          >
            <Form.Item
              name="nameForm"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="emailForm"
              label="E-mail"
              initialvalues={emailState}
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
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="phoneForm"
              label="Phone Number"
              style={{
                width: "100%",
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <RenderStatus />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="button-confirm-infor"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {/* <Col span={6}></Col> */}
      </Row>

      {/* casc
    
    // Modal edit profile vehicle 
    
    */}
      <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <Form
          name="RegisterDriver"
          layout="vertical"
          className={cx("form")}
          onFinish={changeVehicle}
          initialValues={{
            Idcar: id_car,
          }}
        >
          <h1 className={cx("form__title")}>Personal information</h1>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Personal portrait photo is required !",
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
            <Upload
              name="logo"
              action="/upload.do"
              listType="picture"
              defaultFileList={[
                {
                  uid: "-1",
                  name: "Portrait img",
                  status: "done",
                  url: img_portrait,
                  thumbUrl: img_portrait,
                },
              ]}
            >
              <Button
                className={cx("form__item--button")}
                icon={<CameraOutlined />}
              >
                Re-upload portrait
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
            <Upload
              name="logo"
              action="/upload.do"
              listType="picture"
              defaultFileList={[
                {
                  uid: "-1",
                  name: "Citizen Id img",
                  status: "done",
                  url: img_citizen_id,
                  thumbUrl: img_citizen_id,
                },
              ]}
            >
              <Button
                className={cx("form__item--button")}
                icon={<CameraOutlined />}
              >
                Re-upload citizen ID photo
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "License is required !",
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
            <Upload
              name="logo"
              action="/upload.do"
              listType="picture"
              defaultFileList={[
                {
                  uid: "-1",
                  name: "License img",
                  status: "done",
                  url: img_license,
                  thumbUrl: img_license,
                },
              ]}
            >
              <Button
                className={cx("form__item--button")}
                icon={<CameraOutlined />}
              >
                Re-upload license photo
              </Button>
            </Upload>
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
            <Upload
              name="logo"
              action="/upload.do"
              listType="picture"
              defaultFileList={[
                {
                  uid: "-1",
                  name: "Vehicle img",
                  status: "done",
                  url: img_vehicle,
                  thumbUrl: img_vehicle,
                },
              ]}
            >
              <Button
                className={cx("form__item--button")}
                icon={<CameraOutlined />}
              >
                Re-upload photo vehicle
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
            <Upload
              name="logo"
              action="/upload.do"
              listType="picture"
              defaultFileList={[
                {
                  uid: "-1",
                  name: "Registration vehicle img",
                  status: "done",
                  url: img_registration_car,
                  thumbUrl: img_registration_car,
                },
              ]}
            >
              <Button
                className={cx("form__item--button")}
                icon={<CameraOutlined />}
              >
                Re-upload vehicle registration
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
            <Upload
              name="logo"
              action="/upload.do"
              listType="picture"
              defaultFileList={[
                {
                  uid: "-1",
                  name: "Registry vehicle img",
                  status: "done",
                  url: img_registry_car,
                  thumbUrl: img_registry_car,
                },
              ]}
            >
              <Button
                className={cx("form__item--button")}
                icon={<CameraOutlined />}
              >
                Re-upload registry vehicle
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 5,
            }}
          >
            <Button
              className="button-confirm-infor"
              type="primary"
              htmlType="submit"
            >
              <p className="button">Save</p>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
export default ContentInforUserPages;
const formItemLayout = {
  labelCol: {
    span: 11,
  },
  wrapperCol: {
    span: 24,
  },
};
const formItemLayoutadd1col = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};
const fileList = [
  {
    uid: "-1",
    name: "xxx.png",
    status: "done",
    url: "https://mruffalo.com/wp-content/uploads/2021/04/Hanyu-Arisa-My-nhan-JAV-voi-body-goi-tinh-kho-cuong-6.jpg",
    thumbUrl:
      "https://mruffalo.com/wp-content/uploads/2021/04/Hanyu-Arisa-My-nhan-JAV-voi-body-goi-tinh-kho-cuong-6.jpg",
  },
  {
    uid: "-2",
    name: "yyy.png",
    status: "error",
  },
];
const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};
