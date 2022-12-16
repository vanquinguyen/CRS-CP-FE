import classNames from "classnames/bind";
import styles from "./ChangePassWords.module.scss";
import { Row, Col, Form, Input, Button } from "antd";

const cx = classNames.bind(styles);

function ChangePassWords() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <Row>
        <Col offset={1}>
          <h2 className={cx("title")}>Change Password</h2>
        </Col>
      </Row>
      <Row>
        <Col span={22} offset={1}>
          <div className="line"></div>
        </Col>
      </Row>
      <Row>
        <Col span={22} offset={1}>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
          >
            <Form.Item
              name="oldpassword"
              label="Old Password"
              rules={[
                {
                  required: true,
                  message: "Please input your old password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="newpassword"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmn"
              label="Confirm New Password"
              dependencies={["newpassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newpassword") === value) {
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
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                className={"button-confirm-infor" + " " + cx("")}
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

const formItemLayout = {
  labelCol: {
    lg: {
      span: 5,
    },
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    lg: {
      span: 4,
      offset: 0,
    },
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default ChangePassWords;
