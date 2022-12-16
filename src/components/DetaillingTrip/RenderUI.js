import { Button, Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import RenderInfoUser from "./RenderInfoUser";
import { useNavigate } from "react-router-dom";
import { STATUS_TICKET } from "../../constants";
import classNames from "classnames/bind";
import styles from "./RenderUI.module.scss";
import { GrLocation } from "react-icons/gr";

const cx = classNames.bind(styles);
function RenderUI({ position, data }) {
  const [dataSource, setDataSource] = useState(data);
  const navigate = useNavigate();
  useEffect(() => {
    setDataSource(data);
  }, [data]);

  return (
    <>
      <div className={cx("wrapper-title")}>
        <h1 className={cx("title")}>
          Recommend flow pick up <br /> and drop off
        </h1>
      </div>
      <div className={cx("wrapper")}>
        <div className="container" style={{ width: "100%", marginTop: "25px" }}>
          <Row justify="center">
            <Col span={12}>
              <div className={cx("text-loca")}>
                <GrLocation
                  className={cx("icon-loca") + " " + cx("custom-icon-loca")}
                />
                {position.address}
              </div>
            </Col>
          </Row>
        </div>
        {dataSource.list_order.map((itemoder, index) => {
          const info = dataSource.list_customer.filter((item) => {
            return item.id_customer === itemoder.id;
          });
          return (
            <div
              className="container"
              key={itemoder.id + "%123" + itemoder.type}
            >
              <RenderInfoUser
                index={index}
                dataSource={dataSource}
                itemoder={itemoder}
                info={info[0]}
                setDataSource={setDataSource}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RenderUI;
