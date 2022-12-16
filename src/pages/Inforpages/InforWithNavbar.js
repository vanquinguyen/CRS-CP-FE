import InforNavbar from "../../components/InforPages/InforNavbar.js";
import Header from "../../components/Header/index.jsx";
import { Row, Col } from "antd";
import Wrappercontentinfor from "../../components/wrappercontentinfor/index.js";
import { useState } from "react";
import ContentInforUserPages from "../../components/InforPages/ContentInforUserPages/index.js";
import ChangePassWords from "../../components/InforPages/ChangePassWords/index.js";
import ReportDriver from "../../components/InforPages/ReportDriver/index.js";
export default function InforWithNavbar(props) {
  const Render = props.component;
  function Handlenavigate(params) {
    setContent(params);
  }
  function AvatarLink(params) {
    return params;
  }
  const [content, setContent] = useState("profile");
  function RenderComponent() {
    if (content == "profile") {
      return <ContentInforUserPages />;
    }

    if (content == "changepassword") {
      return <ChangePassWords />;
    }
    if (content == "Report Revenue") {
      return <ReportDriver />;
    }
  }
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div style={{ paddingTop: "30px" }}></div>
      <Row justify="center">
        <Row
          //   justify="center"
          style={{
            // backgroundColor: "green",
            width: "1200px",
            display: "flex",
          }}
          gutter={[10, 0]}
        >
          <Col span={4}>
            <InforNavbar props={Handlenavigate} avatar={AvatarLink} />
          </Col>
          <Col span={20}>
            <Wrappercontentinfor>
              <RenderComponent />
            </Wrappercontentinfor>
          </Col>
        </Row>
      </Row>
    </div>
  );
}
