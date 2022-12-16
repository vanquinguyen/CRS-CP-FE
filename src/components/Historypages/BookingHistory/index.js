import { useState, useEffect } from "react";
import { Row, Col, Rate, Modal, Form, Radio, Input, Button } from "antd";
import classNames from "classnames/bind";
import styles from "./BookingHistory.module.scss";
import {
  FaCar,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendar,
  FaHourglassEnd,
  FaHourglassStart,
  FaChair,
  FaShuttleVan,
  FaCreditCard,
  FaTicketAlt,
} from "react-icons/fa";

import moment from "moment";
import axios from "axios";
import { STATUS_TICKET } from "../../../constants";

const cx = classNames.bind(styles);
// ---------------------------------------- Status ticket -----------------------------/////
// status  = 2 driving .//  status = 0 waiting for confirm // . status =-1 . fail . // status = 1 waiting for driving // status = 3 success  ///
// 4 Waiting for report responsive

// ---------------------------------------- Status payment paypal -----------------------------/////
// status_payment  = -1 fail  // stauts_payment = 1 succes payment  // status = 0 waiting for process  //

const History = [
  {
    id: 1,
    typeTicket: "shuttle bus",
    placeStart: "12 Đại Lộ 3 , P. Phú Nhuận , Q9 , Hồ Chí Minh",
    placeStop: "59 lý văn phức , hòa hải , ngũ hành sơn , Đà Nẵng",
    timeStart: "2013-03-07T17:00:00",
    timeStop: "2013-03-07T07:00:00",
    seat: ["ah1", "ah2"],
    cost: "300.000",
    status: 1,
    timepay: "8:156am",
    daypay: "2022-07-17T07:29:18.224Z",
    nameDriver: "Sơn Tùng MTP",
    phoneDriver: "12312213",
    imgDriver:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Son_Tung_M-TP_1_%282017%29.png/640px-Son_Tung_M-TP_1_%282017%29.png",
    typeCar: "Mishubishi Xpander",
    IDcar: "47A-123.45",
  },
  {
    id: 2,
    typeTicket: "shuttle bus",
    placeStart: "12 Đại Lộ 3 , P. Phú Nhuận , Q9 , Hồ Chí Minh",
    placeStop: "59 lý văn phức , hòa hải , ngũ hành sơn , Đà Nẵng",
    timeStart: "2013-03-07T17:00:00",
    timeStop: "2013-03-07T07:00:00",
    seat: ["ah1", "ah2"],
    cost: "300.000",
    timepay: "8:156am",
    daypay: "2022-07-17T07:29:18.224Z",
    nameDriver: "Sơn Tùng MTP",
    rate: "3",
    imgDriver:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Son_Tung_M-TP_1_%282017%29.png/640px-Son_Tung_M-TP_1_%282017%29.png",
    typeCar: "Mishubishi Xpander",
    IDcar: "47A-123.45",
    status: 2,
  },
  {
    id: 3,
    typeTicket: "shuttle bus",
    placeStart: "12 Đại Lộ 3 , P. Phú Nhuận , Q9 , Hồ Chí Minh",
    placeStop: "59 lý văn phức , hòa hải , ngũ hành sơn , Đà Nẵng",
    timeStart: "2022-07-09T01:00:00+08:00",
    timeStop: "2013-03-07T07:00:00+08:00",
    seat: ["ah1", "ah2"],
    cost: "300.000",
    timepay: "8:156am",
    daypay: "2022-07-17T07:29:18.224Z",
    nameDriver: "Sơn Tùng MTP",
    rate: "3",
    imgDriver:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Son_Tung_M-TP_1_%282017%29.png/640px-Son_Tung_M-TP_1_%282017%29.png",
    typeCar: "Mishubishi Xpander",
    IDcar: "47A-123.45",
    status: 3,
  },
  {
    id: 4,
    typeTicket: "shuttle bus",
    placeStart: "12 Đại Lộ 3 , P. Phú Nhuận , Q9 , Hồ Chí Minh",
    placeStop: "59 lý văn phức , hòa hải , ngũ hành sơn , Đà Nẵng",
    timeStart: "2022-07-9T01:00:00+08:00",
    timeStop: "2013-03-07T07:00:00",
    seat: ["ah1", "ah2"],
    cost: "300.000",
    timepay: "8:156am",
    daypay: "2022-07-17T07:29:18.224Z",
    nameDriver: "Sơn Tùng MTP",
    rate: "3",
    imgDriver:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Son_Tung_M-TP_1_%282017%29.png/640px-Son_Tung_M-TP_1_%282017%29.png",
    typeCar: "Mishubishi Xpander",
    IDcar: "47A-123.45",
    status: 3,
  },
];

function BookingHistory() {
  const [form] = Form.useForm();
  const [HistoryList, setHistoryList] = useState(History);
  // const user = JSON.parse(localStorage.getItem("user"));

  // useEffect(() => {
  //   const getHistoryBooking = async () => {
  //     let payload = {
  //       user_id: user.userId,
  //     };

  //     const headers = {
  //       "Content-Type": "application/json",
  //       authorization: "Bearer " + user.accessToken,
  //     };

  //     await axios
  //       .post("http://localhost:5000/api/orderTicket/getOrderList/", payload, {
  //         headers: headers,
  //       })
  //       .then((res) => {
  //         if (res.data.status === "SUCCESS") {
  //           setHistoryList(res.data.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   };

  //   getHistoryBooking();
  // }, []);

  const handelZoomin = (e) => {
    document
      .querySelector(`.itemzoomout${e.target.id}`)
      .classList.add(cx("disable-zoom"));
    document
      .querySelector(`.itemzoomin${e.target.id}`)
      .classList.add(cx("active-zoom"));
  };
  const handelZoomout = (e) => {
    document
      .querySelector(`.itemzoomin${e.target.id}`)
      .classList.remove(cx("active-zoom"));
    document
      .querySelector(`.itemzoomout${e.target.id}`)
      .classList.remove(cx("disable-zoom"));
  };
  function getPlaceShort(params) {
    let element = "";
    let arraycut = "";
    const result = params.lastIndexOf(",");
    arraycut = params.slice(result + 1, params.length);
    for (let index = 0; index < arraycut.length; index++) {
      if (
        arraycut[index] == arraycut[index].toUpperCase() &&
        arraycut[index] != " "
      ) {
        element = element + arraycut[index];
      }
    }
    return element;
  }
  const renderStatus = (param) => {
    return (
      <>
        {param.status === 1 ? (
          <>
            <p className={cx("status")} style={{ color: "green" }}>
              Waiting for driving
            </p>
          </>
        ) : param.status === 0 ? (
          <>
            <p className={cx("status")} style={{ color: "yellowgreen" }}>
              Waiting for confirm
            </p>
          </>
        ) : param.status === -1 ? (
          <>
            <p className={cx("status")} style={{ color: "red" }}>
              Failed
            </p>
          </>
        ) : param.status === 3 ? (
          <>
            <p className={cx("status")}>Successfully</p>
          </>
        ) : param.status === 2 ? (
          <>
            <p className={cx("status")}>Driving </p>
          </>
        ) : (
          <p>Errorr</p>
        )}
      </>
    );
  };
  const handleCancelBooking = (e) => {
    const index = HistoryList.findIndex((item) => {
      return item.id == e.target.getAttribute("idlist");
    });
    let newlist = [...HistoryList];
    newlist.splice(index, 1);
    setHistoryList(newlist);
  };
  const [modalReport, setModalReport] = useState(false);
  const handleReportTrip = (data) => {
    console.log(data);
    setModalReport(false);
  };
  const RenderBtnCancelBooking = ({ data }) => {
    if (
      data.status === STATUS_TICKET.WAITING_FOR_CONFIRM ||
      data.status === STATUS_TICKET.WAITING_FOR_DRIVING
    ) {
      return (
        <>
          <button
            idlist={data.id}
            onClick={handleCancelBooking}
            className={cx("button-detail") + " " + cx("custom-button")}
          >
            Cancel Booking
          </button>
        </>
      );
    }
    if (data.status === STATUS_TICKET.DRIVING) {
      return (
        <>
          <button
            idlist={data.id}
            className={cx("button-detail") + " " + cx("custom-button")}
            onClick={() => setModalReport(true)}
          >
            Report
          </button>
        </>
      );
    }
  };
  const RenderInforDriver = ({ data }) => {
    if (data.nameDriver && data.IDcar && data.imgDriver) {
      return (
        <>
          <Row>
            <h3 className={cx("driver-title")}>Information Driver</h3>
          </Row>
          <Row style={{ marginBottom: "20px" }}>
            <Col span={8}>
              <div
                style={{
                  backgroundImage: `url("${data.imgDriver}")`,
                }}
                className={cx("avatar")}
              ></div>
            </Col>
            <Col span={16}>
              <p className={cx("detal-infor-driver")}>
                Name : {data.nameDriver}
              </p>
              <p className={cx("detal-infor-driver")}>ID car: {data.IDcar}</p>
              <p className={cx("detal-infor-driver")}>
                Phone number : {data.phoneDriver}
              </p>
            </Col>
          </Row>
        </>
      );
    }
  };

  const RenderListt = HistoryList.map((param) => {
    // console.log(param.timeStart.toISOString());
    getPlaceShort(param.placeStart);
    return (
      <div key={param.id}>
        <div className={`itemzoomout${param.id}` + " " + cx("wrapper-mini")}>
          <Row>
            <Col offset={1} span={11}>
              <Row>
                <Col span={1}>
                  {" "}
                  <FaCalendar className="icon" />
                </Col>
                <Col>
                  <p className={cx("details-ticket")}>
                    Date Start:
                    {moment(param.timeStart).format("DD/MM/YYYY")}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className={cx("center-justify")} span={4}>
                  <div className={cx("time-details")}>
                    {moment(param.timeStart).format("HH:MM")}
                  </div>
                  <div className={cx("place")}>
                    {getPlaceShort(param.placeStart)}
                  </div>
                </Col>
                <Col span={6}>
                  <div className={cx("line-crach")}></div>
                </Col>
                <Col className={cx("center-justify")} span={3}>
                  <div className={cx("time-center")}>
                    {moment(param.timeStart)
                      .subtract(moment(param.timeStop))
                      .format("HH:MM")}
                  </div>
                  <div>
                    <FaShuttleVan className={cx("icon-center")} />
                  </div>
                </Col>
                <Col span={6}>
                  <div className={cx("line-crach")}></div>
                </Col>
                <Col className={cx("center-justify")} span={4}>
                  <div className={cx("time-details")}>
                    {" "}
                    {moment(param.timeStop).format("HH:MM")}
                  </div>
                  <div className={cx("place")}>
                    {getPlaceShort(param.placeStop)}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={11}>
              <Row>
                <Col span={22} offset={1}>
                  <Row>
                    <Col span={2}>
                      <FaCreditCard />
                    </Col>
                    <Col span={14}>
                      <p className={cx("details-ticket")}>
                        Total pay: {param.cost}VND
                      </p>
                    </Col>
                    <Col offset={2} span={6}>
                      <button
                        className={cx("button-detail")}
                        onClick={handelZoomin}
                        id={param.id}
                      >
                        See more
                      </button>
                    </Col>
                  </Row>
                  <Row>
                    {param.nameDriver ? (
                      <>
                        <Col span={2}>
                          <img
                            className={cx("icon-deatils-zoom-out")}
                            src={require("../../../../src/assets/images/driver.png")}
                          />
                        </Col>
                        <Col>
                          <p className={cx("details-ticket")}>
                            Driver Name: {param.nameDriver}
                          </p>
                        </Col>
                      </>
                    ) : (
                      <></>
                    )}
                  </Row>
                  <Row>
                    <div style={{ display: "flex" }} className={cx("status")}>
                      Status :{renderStatus(param)}
                    </div>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div
          className={
            cx("aa") + " " + `itemzoomin${param.id}` + " " + cx("wrapper-mini")
          }
        >
          <Row>
            <Col offset={1} span={22}>
              <div className={"wrapper-item"}>
                <Row justify="center">
                  <FaTicketAlt className={cx("icon-title")} />
                  <h3 className={cx("title-infor-ticket")}>
                    Information Ticket
                  </h3>
                </Row>
                <Row>
                  <Col span={16}>
                    <Row>
                      <Col span={1}>
                        <FaCar className="icon" />
                      </Col>
                      <Col>
                        <p className={cx("details-ticket")}>
                          Type ticket: {param.typeTicket}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={1}>
                        {" "}
                        <FaPlaneDeparture className="icon" />
                      </Col>
                      <Col>
                        <p className={cx("details-ticket")}>
                          Pickup Place: {param.placeStart}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={1}>
                        {" "}
                        <FaPlaneArrival className="icon" />
                      </Col>
                      <Col>
                        <p className={cx("details-ticket")}>
                          Destination: {param.placeStop}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={1}>
                        {" "}
                        <FaCalendar className="icon" />
                      </Col>
                      <Col>
                        <p className={cx("details-ticket")}>
                          Date Start:{" "}
                          {moment(param.timeStart).format("DD/MM/YYYY")}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={1}>
                        {" "}
                        <FaCalendar className="icon" />
                      </Col>
                      <Col>
                        <p className={cx("details-ticket")}>
                          Date Finish:{" "}
                          {moment(param.timeStop).format("DD/MM/YYYY")}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={1}>
                        {" "}
                        <FaHourglassStart className="icon" />
                      </Col>
                      <Col>
                        <p className={cx("details-ticket")}>
                          Time Start: {moment(param.timeStart).format("HH:MM")}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={1}>
                        {" "}
                        <FaHourglassEnd className="icon" />
                      </Col>
                      <Col>
                        <p className={cx("details-ticket")}>
                          Time Finish: {moment(param.timeStop).format("HH:MM")}
                        </p>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={1}>
                        {" "}
                        <FaChair className="icon" />
                      </Col>
                      <Col>
                        <p className={cx("details-ticket")}>
                          Seat Location:{" "}
                          {param.seat.map((item, index) => {
                            return index === param.seat.length - 1
                              ? item
                              : item + ", ";
                          })}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row>
                      <h1 className={cx("total")}>Total:</h1>
                      <h1 className={cx("total")} style={{ color: "red" }}>
                        {param.cost}đ
                      </h1>
                    </Row>

                    <RenderInforDriver data={param} />
                    <div style={{ display: "flex" }} className={cx("status")}>
                      Status :{renderStatus(param)}
                    </div>
                    <RenderBtnCancelBooking data={param} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row justify="center">
            <button
              id={param.id}
              className={cx("button-detail")}
              onClick={handelZoomout}
              style={{
                marginBottom: "25px",
              }}
            >
              Show less
            </button>
          </Row>
        </div>
        <Modal
          visible={modalReport}
          onCancel={() => setModalReport(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleReportTrip}>
            <Form.Item label="Choose cause :" name="another_cause_radio">
              <Radio.Group>
                <Radio value="Unable to contact driver">
                  Unable to contact driver
                </Radio>
                <Radio value="Car has a problem">Car has a problem</Radio>
                <Radio value="Waiting for driver too long">
                  Waiting for driver too long
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
        </Modal>
      </div>
    );
  });

  return (
    <>
      <div>
        <Row>
          <Col offset={1}>
            <h3 className={cx("title")}>History Booking :</h3>
          </Col>
        </Row>
        <Row>
          <Col offset={1} span={22}>
            {RenderListt}
          </Col>
        </Row>
      </div>

      <div></div>
    </>
  );
}

export default BookingHistory;
