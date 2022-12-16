import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Payment.scss";
import axios from "axios";
import { useSelector } from "react-redux";

const getCity = (input) => {
  let a = input.split(",");
  return a[a.length - 1].replace(/[0-9]/g, "").trim();
};

function Paypal({ price, description }) {
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: description,
                amount: {
                  currency_code: "USD",
                  value: price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          if (order.status === "COMPLETED") {
            //// hello man a sync
            console.log("oke man");
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render("#paypal-button-container");
  }, []);

  return <div></div>;
}

const Payment = ({
  currentStep,
  setCurrentStep,
  INFO_TICKET,
  REQUEST_INFO,
  isRequestRoute,
  currentBooking,
  distance,
}) => {
  const navigate = useNavigate();
  const [checkout, setCheckOut] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dataBooking = useSelector((state) => state.booking);

  console.log("----------", INFO_TICKET, REQUEST_INFO);

  const createNoti = async () => {
    // some one join trip
    const payload = {
      bookingId: INFO_TICKET.route_info.booking_id,
      typeNoti: "price",
    };

    await axios.post(
      "http://localhost:5000/api/booking/createNotification",
      payload
    );

    // driver accept trip
    // if (!isRequestRoute) {
    // const payload = {
    //   userId: "632884d5190348bbb678b9b8",
    //   typeNoti: "driver-accept",
    // };

    // await axios.post(
    //   "http://localhost:5000/api/booking/createNotification",
    //   payload
    // );
    // }
  };

  return (
    <div className="payment">
      <div className="payment-info">
        <div className="payment-info-header">Ticket information</div>
        <Row className="payment-info-section">
          <Col span={24} className="payment-info-section-title">
            Customer information
          </Col>
          <Col span={12} className="payment-info-section-info">
            <div className="payment-info-section-info-title">Full name</div>
            <div className="payment-info-section-info-text">
              {isRequestRoute
                ? REQUEST_INFO.customer_info.full_name
                : INFO_TICKET.customer_info.full_name}
            </div>
          </Col>
          <Col span={12} className="payment-info-section-info">
            <div className="payment-info-section-info-title">Phone number</div>
            <div className="payment-info-section-info-text">
              {isRequestRoute
                ? REQUEST_INFO.customer_info.phone_number
                : INFO_TICKET.customer_info.phone_number}
            </div>
          </Col>
          <Col span={12} className="payment-info-section-info">
            <div className="payment-info-section-info-title">CMND/CCCD</div>
            <div className="payment-info-section-info-text">
              {isRequestRoute
                ? REQUEST_INFO.customer_info.cmnd
                : INFO_TICKET.customer_info.cmnd}
            </div>
          </Col>
        </Row>
        <Row className="payment-info-section">
          <Col span={24} className="payment-info-section-title">
            Route information
          </Col>
          <Col span={12} className="payment-info-section-info">
            <div className="payment-info-section-info-title">
              {isRequestRoute ? "Destination" : "Route"}
            </div>
            <div className="payment-info-section-info-text">
              {isRequestRoute
                ? REQUEST_INFO.route_info.destination.name
                : `${INFO_TICKET.route_info.pickup_location} -
              ${INFO_TICKET.route_info.destination}`}
            </div>
          </Col>
          <Col span={12} className="payment-info-section-info">
            <div className="payment-info-section-info-title">Seats</div>
            <div className="payment-info-section-info-text">
              {isRequestRoute
                ? REQUEST_INFO.route_info.seats.length
                : INFO_TICKET.route_info.seats.length}
            </div>
          </Col>
          <Col span={12} className="payment-info-section-info">
            <div className="payment-info-section-info-title">Time</div>
            <div className="payment-info-section-info-text">
              {isRequestRoute
                ? REQUEST_INFO.route_info.time
                : moment
                    .utc(INFO_TICKET.route_info.time)
                    .format("HH:mm DD/MM/YYYY")}
            </div>
          </Col>
          <Col span={12} className="payment-info-section-info">
            <div className="payment-info-section-info-title">Seats number</div>
            <div className="payment-info-section-info-text">
              {isRequestRoute
                ? REQUEST_INFO.route_info.seats.toString()
                : INFO_TICKET.route_info.seats.toString()}
            </div>
          </Col>
          <Col span={12} className="payment-info-section-info">
            <div className="payment-info-section-info-title">
              Pickup location
            </div>
            <div className="payment-info-section-info-text">
              {isRequestRoute && REQUEST_INFO.route_info.pickup_location.name}
              {!isRequestRoute && dataBooking.location.pickup.name}
              {INFO_TICKET.route_info.location}
            </div>
          </Col>
          <Col span={12} className="payment-info-section-info">
            <div className="payment-info-section-info-title">Status</div>
            <div className="payment-info-section-info-text">
              {isRequestRoute
                ? REQUEST_INFO.route_info.status
                : INFO_TICKET.route_info.status}
            </div>
          </Col>
        </Row>
        <div className="payment-info-footer">
          <div className="payment-info-footer-title">Total</div>
          <div className="payment-info-footer-number">
            {isRequestRoute
              ? REQUEST_INFO.route_info.total
              : INFO_TICKET.route_info.total}
            <span style={{ fontSize: "14px", paddingLeft: "8px" }}>VND</span>
          </div>
        </div>
      </div>

      <Row className="payment-pay" justify="space-between">
        <Col span={24} className="payment-pay-title">
          Pay ways
        </Col>
        <Col span={5} className="payment-pay-section">
          <img
            className="payment-pay-section-avatar"
            src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
            alt=""
          />
          <div className="payment-pay-section-label">Momo</div>
          <div className="payment-pay-section-icon">
            <RightOutlined />
          </div>
        </Col>
        <Col span={5} className="payment-pay-section">
          <img
            className="payment-pay-section-avatar"
            src="https://scontent.iocvnpt.com/resources/portal//Images/BDG/ntnghia.bdg/tien_ich/logo_atm_637211827597942784.png"
            alt=""
          />
          <div className="payment-pay-section-label"> ATM</div>
          <div className="payment-pay-section-icon">
            <RightOutlined />
          </div>
        </Col>

        {checkout ? (
          <Col
            span={5}
            className="payment-pay-section1"
            onClick={() => setCheckOut(true)}
          >
            <div id="paypal-button-container"></div>
            <Paypal
              price={
                isRequestRoute
                  ? (REQUEST_INFO.route_info.total / 23400).toFixed(2)
                  : (INFO_TICKET.route_info.total / 23400).toFixed(2)
              }
              description={`Payment for ticket ID: ${INFO_TICKET.route_info.booking_id}`}
            />
          </Col>
        ) : (
          <Col
            span={5}
            className="payment-pay-section"
            onClick={() => setCheckOut(true)}
          >
            <img
              className="payment-pay-section-avatar"
              src="https://cdn-icons-png.flaticon.com/512/179/179453.png?w=360"
              alt=""
            />
            <div className="payment-pay-section-label"> PayPal</div>
            <div className="payment-pay-section-icon">
              <RightOutlined />
            </div>
          </Col>
        )}
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
        <Col
          span={8}
          className="buy-ticket-navigate-continue"
          onClick={async () => {
            if (isRequestRoute) {
              let date =
                REQUEST_INFO.route_info.date +
                "T" +
                REQUEST_INFO.route_info.time +
                ":00";

              let startTime = moment(date).add(7, "h").toISOString();
              let endTime = moment(date).add(25, "h").toISOString();

              let startName = getCity(
                REQUEST_INFO.route_info.pickup_location.name
              );
              let endName = getCity(REQUEST_INFO.route_info.destination.name);
              const order = {
                user_id: user.userId,
                user_name: user.name,
                phone_number: user.phoneNumber,
                booking_id: "",
                status: 0,
                seats: REQUEST_INFO.route_info.seats,
                pick_point_name: REQUEST_INFO.route_info.pickup_location.name,
                pick_point_lat:
                  REQUEST_INFO.route_info.pickup_location.coordinates.lat,
                pick_point_lng:
                  REQUEST_INFO.route_info.pickup_location.coordinates.lng,
                drop_point_name: REQUEST_INFO.route_info.destination.name,
                drop_point_lat:
                  REQUEST_INFO.route_info.destination.coordinates.lat,
                drop_point_lng:
                  REQUEST_INFO.route_info.destination.coordinates.lng,
                create_date: moment(new Date()).add(7, "h").toISOString(),
                price: REQUEST_INFO.route_info.total,
                distance: distance,
              };

              const booking = {
                car_id: "",
                rider_id: "",
                branch_id: "",
                avatar: "",
                status: 0,
                start_location_name: startName,
                start_location_lat:
                  REQUEST_INFO.route_info.pickup_location.coordinates.lat,
                start_location_lng:
                  REQUEST_INFO.route_info.pickup_location.coordinates.lng,
                end_location_name: endName,
                end_location_lat:
                  REQUEST_INFO.route_info.destination.coordinates.lat,
                end_location_lng:
                  REQUEST_INFO.route_info.destination.coordinates.lng,
                start_time: startTime,
                end_time: endTime,
                price: REQUEST_INFO.route_info.total,
                carType: REQUEST_INFO.route_info.carType === "car4" ? 4 : 7,
              };

              const payload = {
                booking: booking,
                order: order,
              };

              console.log(payload);

              await axios
                .post("http://localhost:5000/api/booking/setBooking/", payload)
                .then((res) => {
                  if (res.data.status === "success") navigate("/");
                })
                .catch((error) => {
                  console.log(error.message);
                });
            } else {
              const order = {
                user_id: user.userId,
                booking_id: INFO_TICKET.route_info.booking_id,
                user_name: user.name,
                phone_number: user.phoneNumber,
                status: INFO_TICKET.route_info.status,
                seats: INFO_TICKET.route_info.seats,
                pick_point_name: dataBooking.location.pickup.name,
                pick_point_lat: dataBooking.location.pickup.coordinates.lat,
                pick_point_lng: dataBooking.location.pickup.coordinates.lng,
                drop_point_name: dataBooking.location.destination.name,
                drop_point_lat:
                  dataBooking.location.destination.coordinates.lat,
                drop_point_lng:
                  dataBooking.location.destination.coordinates.lng,
                create_date: moment(new Date()).add(7, "h").toISOString(),
                price: INFO_TICKET.route_info.total,
                distance: distance,
              };

              const payload = {
                order: order,
                car_id: INFO_TICKET.route_info.car_id,
                date: moment(dataBooking.date_department)
                  .add(7, "h")
                  .toISOString(),
                ticket_price: INFO_TICKET.route_info.ticket_price,
              };

              console.log(payload);

              await axios
                .post("http://localhost:5000/api/booking/orderTicket/", payload)
                .then((res) => {
                  if (res.data.status === "success") {
                    setTimeout(() => createNoti(), 1000);
                    navigate("/");
                  }
                })
                .catch((error) => {
                  console.log(error.message);
                });
            }
          }}
        >
          Continue
          <RightOutlined className="buy-ticket-navigate-continue-icon" />
        </Col>
      </Row>
    </div>
  );
};

export default Payment;
