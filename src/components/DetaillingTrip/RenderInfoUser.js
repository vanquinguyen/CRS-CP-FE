import { Button, Form, Input, Modal, Progress, Radio } from "antd";
import React, { useState } from "react";
import { AiFillPhone, AiOutlineCheckCircle } from "react-icons/ai";
import { IoLocationOutline, IoPerson } from "react-icons/io5";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import classNames from "classnames/bind";
import styles from "./RenderInforUser.module.scss";
import { BsCircle } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { BiTimer } from "react-icons/bi";
import { STATUS_TICKET } from "../../constants";
import { Row, Col } from "antd";
import { GrMapLocation } from "react-icons/gr";
import { GiBusStop } from "react-icons/gi";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";

const cx = classNames.bind(styles);
function RenderInfoUser({ itemoder, info, setDataSource, dataSource, index }) {
  const [form] = Form.useForm();
  const [opendetailsModal, setOpendetailsModal] = useState(false);
  const [renderReportcom, setRenderReportcom] = useState(false);
  const navigate = useNavigate();

  const activeModal = (info) => {
    setOpendetailsModal(true);
  };
  const hideModal = () => {
    setOpendetailsModal(false);
  };
  const handlePickup = () => {
    let newarr = [...dataSource.list_order];
    newarr.splice(index, 1, { ...itemoder, status: true });

    if (checkCompleted(newarr)) {
      setDataSource({
        ...dataSource,
        list_order: newarr,
        status_driver: STATUS_TICKET.SUCCESS,
      });
    } else {
      setDataSource({ ...dataSource, list_order: newarr });
    }
    setOpendetailsModal(false);
  };
  const handleDropoff = () => {
    let newarr = [...dataSource.list_order];
    newarr.splice(index, 1, { ...itemoder, status: true });
    if (checkCompleted(newarr)) {
      setDataSource({
        ...dataSource,
        list_order: newarr,
        status_driver: STATUS_TICKET.SUCCESS,
      });
    } else {
      setDataSource({ ...dataSource, list_order: newarr });
    }
    setOpendetailsModal(false);
  };
  const checkCompleted = (data) => {
    const checked = data.every((item) => item.status === true);
    return checked;
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const CheckoutDriving = () => {
    return (
      <Modal
        visible={dataSource.status_driver === STATUS_TICKET.SUCCESS}
        footer={null}
      >
        <div>You have completed trip !!! </div>
        <Button
          onClick={async () => {
            const payload = {
              driver_id: user.userId,
            };

            await axios
              .post("http://localhost:5000/api/booking/completeTrip/", payload)
              .catch((error) => {
                console.log(error.message);
              });

            window.location.reload();
          }}
        >
          Checkout
        </Button>
      </Modal>
    );
  };

  const RenderBtn = ({ itemoder }) => {
    return (
      <div>
        {dataSource.status_driver === STATUS_TICKET.DRIVING ||
        dataSource.status_driver === STATUS_TICKET.WAITING_FOR_DRIVING ? (
          <>
            <div
              style={{ display: itemoder.type === "start" ? "block" : "none" }}
            >
              {itemoder.status === false ? (
                <Button onClick={handlePickup}>Pick up</Button>
              ) : (
                <Button disabled>Pick up</Button>
              )}
            </div>
            <div
              style={{ display: itemoder.type === "stop" ? "block" : "none" }}
            >
              {itemoder.status === false ? (
                <Button onClick={handleDropoff}>Drop off</Button>
              ) : (
                <Button disabled>Drop off</Button>
              )}
            </div>
          </>
        ) : (
          <Button disabled>Not yet</Button>
        )}
      </div>
    );
  };
  const handleReport = (value) => {
    console.log(value);
    let newarr = [...dataSource.list_order];
    newarr.splice(index, 1, { ...itemoder, isReport: true, status: true });
    const itemStop = newarr.filter((item) => {
      return item.id === itemoder.id && item.type === "stop";
    });
    const idexItemStop = newarr.findIndex((item) => {
      return item.id === itemoder.id && item.type === "stop";
    });

    newarr.splice(idexItemStop - 1, 1, {
      ...itemStop[0],
      isReport: true,
      status: true,
    });

    setDataSource({
      ...dataSource,
      list_order: newarr,
    });
    setRenderReportcom(false);
    hideModal();
  };
  const Renderbtnreport = ({ itemoder }) => {
    return itemoder.type === "start" &&
      itemoder.status === false &&
      dataSource.status_driver === STATUS_TICKET.DRIVING ? (
      renderReportcom === false ? (
        <Button
          onClick={() => {
            setRenderReportcom(true);
          }}
          danger
        >
          Report
        </Button>
      ) : (
        <Button
          onClick={() => {
            setRenderReportcom(false);
          }}
        >
          Close report
        </Button>
      )
    ) : (
      <></>
    );
  };
  function StatusRender({ isReport, status, type }) {
    if (!isReport) {
      if (status === true) {
        return (
          <div>
            {type === "start" ? (
              <div className={cx("wrapper-icon-loca")}>
                Pick up :
                <Progress
                  type="circle"
                  percent={100}
                  width={15}
                  style={{
                    fontSize: 12,
                    marginLeft: "10px",
                    marginRight: "25px",
                  }}
                />
              </div>
            ) : (
              <div className={cx("wrapper-icon-loca")}>
                Drop off :
                <Progress
                  type="circle"
                  percent={100}
                  width={15}
                  style={{
                    fontSize: 12,
                    marginLeft: "10px",
                    marginRight: "25px",
                  }}
                />
              </div>
            )}
          </div>
        );
      }
      if (status === false) {
        return (
          <div>
            {type === "start" ? (
              <div className={cx("wrapper-icon-loca")}>
                Pick up :
                <LoadingOutlined
                  style={{
                    fontSize: 12,
                    marginLeft: "10px",
                    marginRight: "25px",
                    color: "#1890ff",
                  }}
                  spin
                />
              </div>
            ) : (
              <div className={cx("wrapper-icon-loca")}>
                Drop off :
                <LoadingOutlined
                  style={{
                    fontSize: 12,
                    marginLeft: "10px",
                    marginRight: "25px",
                    color: "#1890ff",
                  }}
                  spin
                />
              </div>
            )}
          </div>
        );
      }
    }
    if (isReport) {
      return (
        <div className={cx("wrapper-icon-loca")}>
          Report violations :
          <Progress
            type="circle"
            percent={0}
            status="exception"
            width={15}
            style={{
              fontSize: 12,
              marginLeft: "10px",
              marginRight: "25px",
            }}
          />
        </div>
      );
    }
  }
  return (
    <div
      style={{
        width: "100%",
        opacity:
          itemoder.status === true
            ? "0.7"
            : itemoder.isReport === true
            ? "0.4"
            : "1",
      }}
    >
      <CheckoutDriving />
      <Row justify="center">
        <Col span={12}>
          <div
            className={cx("wrapper-loca")}
            onClick={() => {
              if (itemoder.isReport === false) {
                activeModal(itemoder);
              }
            }}
          >
            <div className={cx("wrapper-content-node")}>
              <div className={cx("wrapper-step")}>
                <div className={cx("wrapper-dis-du")}>Step: {index + 1}</div>
              </div>
              <div className={cx("distance-node")}>
                <div className={cx("wrapper-dis-du")}>
                  <StatusRender
                    isReport={itemoder.isReport}
                    status={itemoder.status}
                    type={itemoder.type}
                  />
                </div>
                <div className={cx("wrapper-dis-du")}>
                  <GiPathDistance className={cx("icon-distance")} />
                  {itemoder.distance}
                </div>
                <div className={cx("wrapper-dis-du")}>
                  <BiTimer className={cx("icon-duration")} />
                  {itemoder.duration}
                </div>
              </div>
              <div style={{ marginTop: "8px" }}></div>
              <div className={cx("wrapper-dis-du")}>
                <GiBusStop
                  className={cx("icon-distance") + " " + cx("margin")}
                />
                <span className={cx("text-distacne")}>{itemoder.place}</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Modal
        footer={null}
        title="Details Customer"
        visible={opendetailsModal}
        onCancel={hideModal}
      >
        <div key={itemoder.id_customer}>
          <div>
            <IoPerson className={cx("icon")} />
            Name: {info.name_customer}
          </div>
          <div>
            <AiFillPhone className={cx("icon")} />
            Phone Number: {info.phone_number}
          </div>
          <div>
            <MdAirlineSeatReclineExtra className={cx("icon")} />
            Amount Seat: {info.amount_customer}
          </div>
          <div>Total: {info.total} vnd</div>
          {renderReportcom && (
            <div className={cx("wrapper-report")}>
              <h5 className={cx("report-title")}>Reflect to us</h5>
              <Form form={form} layout="vertical" onFinish={handleReport}>
                <Form.Item label="Choose cause :" name="another_cause_radio">
                  <Radio.Group>
                    <Radio value="Unable to contact customer">
                      Unable to contact customer
                    </Radio>
                    <Radio value="Too much luggage">Too much luggage</Radio>
                    <Radio value="Waiting for customers too long">
                      Waiting for customers too long
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Another cause: " name="another_cause_input">
                  <Input placeholder="Input another casue here" />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                  Send request
                </Button>
              </Form>
            </div>
          )}
          <div className={cx("wrapper-button-modal")}>
            <RenderBtn info={info} itemoder={itemoder} />
            <Renderbtnreport info={info} itemoder={itemoder} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RenderInfoUser;
