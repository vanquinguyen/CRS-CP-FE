import { Col, notification, Row } from "antd";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./index.scss";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useCountdown } from "react-countdown-circle-timer";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { openNotification } from "../../services/openNotification";
import moment from "moment";

const getCity = (input) => {
  let a = input.split(",");
  return a[a.length - 1].replace(/[0-9]/g, "").trim();
};

const BookDriverPage = () => {
  const [routeData, setRouteData] = useState([]);
  const openNotificationLocal = (placement) => {
    notification.info({
      message: `Warning `,
      description:
        "Because you don't pick this route, you will block pick route in 5 minutes",
      placement,
    });
  };
  const navigate = useNavigate();

  const dataBooking = useSelector((state) => state.booking);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getRequestBooking = async () => {
      let payload = {
        start_location: getCity(dataBooking.location.pickup.name),
        date: moment.utc(dataBooking.date_department).toISOString(),
        userId: user.userId,
      };

      await axios
        .post("http://localhost:5000/api/booking/getRequestBooking/", payload)
        .then((res) => {
          setRouteData(res.data.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    getRequestBooking();
  }, []);

  const createNoti = async () => {
    const payload = {
      bookingId: routeData.booking_id,
      typeNoti: "driver-accept",
    };

    await axios.post(
      "http://localhost:5000/api/booking/createNotification",
      payload
    );
  };

  return (
    <div className="container">
      <div className="book-driver-title ">Request from customer</div>
      {_.isEmpty(routeData) ? (
        <div className="book-driver-empty">empty</div>
      ) : (
        <Row className=" book-driver">
          <Col span={24} className="book-driver-info">
            <div className="book-driver-info-pickup">
              <div className="book-driver-info-pickup-name">
                <div className="book-driver-info-pickup-name-icon">
                  <img
                    src={require("../../assets/images/pickup_icon.png")}
                    alt=""
                  />
                </div>
                <div className="book-driver-info-pickup-name-text">
                  {routeData.pickup_name}
                </div>
              </div>
              <div className="book-driver-info-pickup-address">
                {routeData.pickup_address}
              </div>
            </div>
            <div className="book-driver-info-destination">
              <div className="book-driver-info-destination-name">
                <div className="book-driver-info-destination-name-icon">
                  <img
                    src={require("../../assets/images/destination_icon.png")}
                    alt=""
                  />
                </div>
                <div className="book-driver-info-destination-name-text">
                  {routeData.destination_name}
                </div>
              </div>
              <div className="book-driver-info-destination-address">
                {routeData.destination_address}
              </div>
            </div>
          </Col>
          <Col span={19} className="book-driver-price">
            <div className="book-driver-price-label">Income:</div>
            <div className="book-driver-price-text">
              {routeData.price} <span style={{ fontSize: "14px" }}>VND</span>
            </div>
          </Col>
          <Col
            span={5}
            className="book-driver-button"
            onClick={async () => {
              let payload = {
                booking_id: routeData.booking_id,
                orderTicket_id: routeData.orderTicket_id,
                user_id: user.userId,
                start_time: routeData.start_time,
              };

              await axios
                .post("http://localhost:5000/api/booking/takeBooking/", payload)
                .then((res) => {
                  if (res.data.status === "success") {
                    openNotification(
                      "success",
                      "Take trip successfully",
                      "Thanks you for take trip, have a good trip!"
                    );
                    createNoti();
                    navigate("/");
                  }
                })
                .catch((error) => {
                  console.log(error.message);
                });
            }}
          >
            <span style={{ marginRight: "12px" }}>Take trip</span>
            <CountdownCircleTimer
              isPlaying
              duration={10}
              size={40}
              strokeWidth={3}
              colors={["#fff", "#fff", "#fff", "#fff"]}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => {
                openNotificationLocal("topRight");
                setTimeout(() => {
                  navigate("/");
                }, 5000);
              }}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookDriverPage;
