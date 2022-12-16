import { Row, Col, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./TripHistory.module.scss";
import moment from "moment";
import { FaCalendar } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlinePlace, MdAirlineSeatReclineNormal } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";

const cx = classNames.bind(styles);

function TripHistory() {
  const [tripHistory, setTripHistory] = useState([]);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const getListBooking = async () => {
      const payload = { rider_id: auth.id };
      const res = await axios.post(
        "http://localhost:5000/api/booking/getBookingListDriver",
        payload
      );
      // const data = res.data.data.map((item) => {
      //   return {
      //     ...item,
      //     isNew: true,
      //   };
      // });

      const newData = res.data.data.map((item) => {
        return {
          id: item._id,
          total: item.price,
          amont_seat: 2,
          status_driver: item.status,
          time_stop: item.end_time,
          address_start: item.start_location_name,
          time_start: item.start_time,
          address_stop: item.end_location_name,
        };
      });
      setTripHistory(newData);

      // setNotifications(data);
    };
    getListBooking();
  }, []);

  const updateStatus = (activeDriver) => {
    if (activeDriver == 0) {
      return "Waiting for Driving";
    }
    if (activeDriver == 1) {
      return "Driving";
    }
    if (activeDriver == 3) {
      return "Completed";
    }
    if (activeDriver == -1) {
      return "Faild";
    }
  };

  const RenderList = tripHistory.map((param) => {
    // if satusdriver , activer driver = 0 -- waiting / =1 -- driving / =2 -- complete / =-1 faild

    return (
      <div key={param.id} className={cx("wrapper-content")}>
        <Row>
          <Col offset={1} span={11}>
            <div className={cx("wrapper")}>
              <div>
                <div className={cx("item-content")}>
                  <FaCalendar className={cx("icon")} />
                  Time Start:{" "}
                  {moment(param.time_start).format("HH:MM -- DD/MM/YYYYY")}
                </div>
                <div className={cx("item-content")}>
                  <MdOutlinePlace className={cx("icon")} />
                  Address Start: {getPlaceShort(param.address_start)}
                </div>
                <Row className={cx("item-content")}>
                  <FaCalendar className={cx("icon")} />
                  Time Stop:
                  <p
                    className={cx("timeStop-p")}
                    style={{
                      color: param.time_start ? "black" : "yellow",
                    }}
                  >
                    {moment(param.time_stop).format("HH:MM -- DD/MM/YYYYY")}
                  </p>
                </Row>
                <div className={cx("item-content")}>
                  <MdOutlinePlace className={cx("icon")} />
                  Address Stop: {getPlaceShort(param.address_stop)}
                </div>
              </div>
            </div>
          </Col>
          <Col span={11}>
            <Row>
              <Col span={14}>
                <div className={cx("item-content")}>
                  Status:
                  {updateStatus(param.status_driver)}
                </div>
                <div className={cx("item-content")}>
                  <MdAirlineSeatReclineNormal className={cx("icon")} />
                  Amount Seat: {param.amont_seat}
                </div>
                <div className={cx("item-content")}>
                  <RiMoneyDollarCircleLine className={cx("icon")} />
                  <span>Total : {param.total} vnd</span>
                </div>
              </Col>
              <Col span={10}></Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  });
  return (
    <div className={cx("wrapper")}>
      <Row>
        <Col offset={1}>
          <h2 className={cx("title")}>Trip History :</h2>
        </Col>
      </Row>
      <Row>
        <Col span={22} offset={1}>
          {RenderList}
        </Col>
      </Row>
    </div>
  );
}
export default TripHistory;
function getPlaceShort(params) {
  let element = "";
  let arraycut = "";
  const result = params.lastIndexOf(",");
  arraycut = params.slice(result + 1, params.length);

  return arraycut;
}
