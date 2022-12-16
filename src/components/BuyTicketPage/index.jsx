import { Modal } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import ChooseRoute from "./ChooseRoute";
import CustomerInfo from "./CustomerInfo";
import "./index.scss";
import Payment from "./Payment";
import StepCustom from "./StepCustom";
import axios from "axios";

const getCity = (input) => {
  let a = input?.split(",");
  return a[a.length - 1]?.replace(/[0-9]/g, "").trim();
};

const BuyTicketPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [listRouteMain, setListRouteMain] = useState([]);
  const [dataListRoute, setDataListRoute] = useState([]);
  const [isRequestRoute, setIsRequestRoute] = useState(false);
  const location = useLocation();
  const [currentBooking, setCurrentBooking] = useState();
  const [distance, setDistance] = useState(0);

  const [ticketInfo, setTicketInfo] = useState({
    customer_info: {
      full_name: "",
      phone_number: "",
      cmnd: "",
    },
    route_info: {
      booking_id: "",
      car_id: "",
      pickup_location: "",
      destination: "",
      time: "",
      seats: [],
      location: "",
      status: "",
      total: 0,
    },
  });
  const [requestInfo, setRequestInfo] = useState({
    customer_info: {
      full_name: "",
      phone_number: "",
      cmnd: "",
    },
    route_info: {
      pickup_location: "",
      destination: "",
      time: "",
      date: "",
      seats: [],
      status: "",
      numberWant: 0,
      total: 0,
      carType: "",
    },
  });

  const dataBooking = useSelector((state) => state.booking);
  const auth = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(!auth.id);
  const navigate = useNavigate(0);
  const handleOk = () => {
    navigate("/login", { state: location.pathname });
  };
  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    const getBookingList = async () => {
      let payload;
      payload = {
        start_location: dataBooking.location.pickup,
        end_location: dataBooking.location.destination,
        date: moment.utc(dataBooking.date_department).toISOString(),
      };

      await axios
        .post("http://localhost:5000/api/booking/getBookingList/", payload)
        .then((res) => {
          setListRouteMain([...res.data.data]);
          setDataListRoute([...res.data.data]);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    const getDistance = async () => {
      const data = await axios.get(
        `https://secure-fortress-29312.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?destination=${dataBooking.location.pickup.name}&origin=${dataBooking.location.destination.name}&key=AIzaSyCcdhrpyCJYTA-CSSjxnWLZEiJA7UFzWYM&fbclid=IwAR1b6fuTWD3GZonoqVfkTMk61MJJ2bH2yjjcLkU-UsrhdHaPh0jXy8YRtfE`
      );

      let distance1 = parseInt(
        data.data.routes[0].legs[0].distance.text.split(" ")[0]
      );

      setDistance(distance1);
    };

    getDistance();
    getBookingList();
  }, []);

  const getInfoTicket = (string, data) => {
    if (string === "getCustomer") {
      setTicketInfo({ ...ticketInfo, customer_info: data });
    }
    if (string === "getRoute") {
      setTicketInfo({ ...ticketInfo, route_info: data });
    }
  };
  const getInfoRequest = (string, data) => {
    if (string === "getCustomer") {
      setRequestInfo({ ...requestInfo, customer_info: data });
    }
    if (string === "getRoute") {
      setRequestInfo({ ...requestInfo, route_info: data });
    }
  };

  return (
    <>
      <div className="buy-ticket container">
        <div className="buy-ticket-title">{`${getCity(
          dataBooking.location.pickup.name
        )} - ${getCity(dataBooking.location.destination.name)}`}</div>
        {(currentStep === 1 || currentStep === 2) && (
          <div className="buy-ticket-content">
            {moment
              .utc(dataBooking.date_department)
              .add(7, "h")
              .format("DD/MM/YYYY")}
          </div>
        )}
        <div className="buy-ticket-steps-container">
          <div className="buy-ticket-steps-title">
            <div className="buy-ticket-steps-title-label">Choose route</div>
            <div className="buy-ticket-steps-title-label">Confirm route</div>
            <div className="buy-ticket-steps-title-label">
              Customer information
            </div>
            <div className="buy-ticket-steps-title-label">Pay</div>
          </div>
          <div className="buy-ticket-steps">
            <StepCustom
              desc={1}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            <div
              className={
                currentStep >= 2
                  ? "buy-ticket-steps-line active"
                  : "buy-ticket-steps-line"
              }
            ></div>
            <StepCustom
              desc={2}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            <div
              className={
                currentStep >= 3
                  ? "buy-ticket-steps-line active"
                  : "buy-ticket-steps-line"
              }
            ></div>
            <StepCustom
              desc={3}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            <div
              className={
                currentStep >= 4
                  ? "buy-ticket-steps-line active"
                  : "buy-ticket-steps-line"
              }
            ></div>
            <StepCustom
              desc={4}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>
        </div>
        {(currentStep === 1 || currentStep === 2) && (
          <ChooseRoute
            listRouteMain={listRouteMain}
            currentStep={currentStep}
            step={currentStep}
            setCurrentStep={setCurrentStep}
            getInfoTicket={getInfoTicket}
            dataListRoute={dataListRoute}
            setDataListRoute={setDataListRoute}
            getInfoRequest={getInfoRequest}
            isRequestRoute={isRequestRoute}
            setIsRequestRoute={setIsRequestRoute}
            setCurrentBooking={setCurrentBooking}
            distance={distance}
          />
        )}
        {currentStep === 3 && (
          <CustomerInfo
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            getInfoTicket={getInfoTicket}
            isRequestRoute={isRequestRoute}
            getInfoRequest={getInfoRequest}
          />
        )}
        {currentStep === 4 && (
          <Payment
            isRequestRoute={isRequestRoute}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            INFO_TICKET={ticketInfo}
            REQUEST_INFO={requestInfo}
            currentBooking={currentBooking}
            distance={distance}
          />
        )}
      </div>
      <Modal
        title="Not logged in"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        maskClosable={false}
      >
        <p>Please login to continue</p>
      </Modal>
    </>
  );
};

export default BuyTicketPage;
