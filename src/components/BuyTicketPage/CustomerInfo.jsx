import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import "./CustomerInfo.scss";

const CustomerInfo = ({
  currentStep,
  setCurrentStep,
  getInfoTicket,
  isRequestRoute,
  getInfoRequest,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    isRequestRoute
      ? getInfoRequest("getCustomer", {
          full_name: values.full_name,
          phone_number: values.phone_number,
          cmnd: values.cmnd,
        })
      : getInfoTicket("getCustomer", {
          full_name: values.full_name,
          phone_number: values.phone_number,
          cmnd: values.cmnd,
        });
    setCurrentStep(currentStep + 1);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const auth = useSelector((state) => state.auth);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="container">
        <Row className="customer-info">
          <Col span={12} md={12} xs={24} className="customer-info-main">
            <div className="customer-info-main-title">Customer information</div>
            <div className="customer-info-main-section">
              <Form.Item
                label="Full name customer"
                tooltip="This is a required field"
                name="full_name"
                initialValue={auth.name}
                rules={[
                  {
                    required: true,
                    message: "Please input your Full name!",
                  },
                ]}
              >
                <Input placeholder="Full name customer" />
              </Form.Item>
              <Form.Item
                label="Phone number"
                tooltip="This is a required field"
                name="phone_number"
                initialValue={auth.phone}
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input placeholder="Phone number" />
              </Form.Item>{" "}
              <Form.Item
                label="CMND/CCCD"
                rules={[
                  {
                    required: true,
                    message: "Please input your CMND or CCCD!",
                  },
                ]}
                initialValue={auth.cmnd}
                tooltip="This is a required field"
                name="cmnd"
              >
                <Input placeholder="CMND/CCCD" />
              </Form.Item>
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
              >
                <Checkbox>I have read the agreement</Checkbox>
              </Form.Item>
            </div>
            <div className="customer-info-main-confirm"></div>
          </Col>
          <Col span={12} md={12} xs={24} className="customer-info-rules">
            <div className="customer-info-rules-title">Rules buy ticket</div>
            <div className="customer-info-rules-section">
              (*) Please bring a text message containing the ticket code to the
              office to redeem your ticket at least 30 minutes before departure
              time
            </div>
            <div className="customer-info-rules-section">
              (*) Please bring a text message containing the ticket code to the
              office to redeem your ticket at least 30 minutes before departure
              time
            </div>
            <div className="customer-info-rules-section">
              (*) Please bring a text message containing the ticket code to the
              office to redeem your ticket at least 30 minutes before departure
              time
            </div>
            <div className="customer-info-rules-section">
              (*) Please bring a text message containing the ticket code to the
              office to redeem your ticket at least 30 minutes before departure
              time
            </div>
          </Col>
        </Row>
        <Row className="buy-ticket-navigate">
          <Col
            span={8}
            className="buy-ticket-navigate-back"
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          >
            <LeftOutlined className="buy-ticket-navigate-back-icon" />
            Back
          </Col>
          <Col span={8}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="buy-ticket-navigate-continue"
              >
                Continue
                <RightOutlined className="buy-ticket-navigate-continue-icon" />
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default CustomerInfo;
