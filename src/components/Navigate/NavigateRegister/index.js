import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NagivateRegister.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
function NavigateRegister() {
  const navigate = useNavigate();
  function navigateDriverRegis(params) {
    navigate("/register-driver");
  }
  function navigateCustomerRegis(params) {
    navigate("/register");
  }
  function returnHome(params) {
    navigate("/");
  }

  return (
    <Row>
      <Col offset={1} span={23}>
        <div className={cx("wrapper")} style={{ cursor: "pointer" }}>
          <Row style={{ marginTop: "15%" }}>
            <CloseOutlined className={cx("icon-x")} onClick={returnHome} />
            <Col>
              <span className={cx("item")} onClick={navigateDriverRegis}>
                Become to driver Vastum{" "}
                <ArrowRightOutlined className={cx("icon")} />
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className={cx("item")} onClick={navigateCustomerRegis}>
                Become to customer Vastum{" "}
                <ArrowRightOutlined className={cx("icon")} />
              </span>
            </Col>
          </Row>
          {/* <div>Be a partner with Hello</div> */}
        </div>
      </Col>
    </Row>
  );
}

export default NavigateRegister;
