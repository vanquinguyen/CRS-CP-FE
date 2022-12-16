import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Col, DatePicker, Row, Select, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdEventSeat } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Car4Seats from "../Cars/Car4Seats";
import Car7Seats from "../Cars/Car7Seats";
import ChooseCarItem from "../ChooseCarItem";
import "./ChooseRoute.scss";

const { Option } = Select;

const seatChartCar7 = {
  seats: [
    { name: "Driver", key: 0 },
    { name: "A01", key: 1 },
    { name: "A02", key: 2 },
    { name: "A03", key: 3 },
    { name: "A04", key: 4 },
    { name: "A05", key: 5 },
    { name: "A06", key: 6 },
  ],
  occupied: [0],
  selected: [],
  price: 0,
};
const seatChartCar4 = {
  seats: [
    { name: "Driver", key: 0 },
    { name: "A01", key: 1 },
    { name: "A02", key: 2 },
    { name: "A03", key: 3 },
  ],
  occupied: [0],
  selected: [],
  price: 0,
};

const ChooseRoute = ({
  step,
  currentStep,
  setCurrentStep,
  getInfoTicket,
  listRouteMain,
  dataListRoute,
  setDataListRoute,
  getInfoRequest,
  setIsRequestRoute,
  isRequestRoute,
  setCurrentBooking,
  distance,
}) => {
  const [filterRoute, setFilterRoute] = useState({
    PRICE: undefined,
    CAR: undefined,
    TIME: undefined,
  });
  const [routeOpen, setRouteOpen] = useState(null);
  const [seatsNewRequest, setSeatsNewRequest] = useState(seatChartCar4);
  const [listSeatSelected, setListSeatSelected] = useState([]);
  const [dateGo, setDateGo] = useState();
  const [timeGo, setTimeGo] = useState();
  const [carType, setCarType] = useState("car4");
  const dataBooking = useSelector((state) => state.booking);
  const [totalTicketRequest, setTotalTicketRequest] = useState(0);
  const [typeCar4Price, setTypeCar4Price] = useState(0);
  const [typeCar7Price, setTypeCar7Price] = useState(0);
  const [sumDistance, setSumDistance] = useState();

  useEffect(() => {
    setSumDistance(distance);
  }, [distance]);

  const navigate = useNavigate();

  const handleChangeFilter = (value, string) => {
    if (string === "PRICE") {
      setFilterRoute({ ...filterRoute, PRICE: value });
    }
    if (string === "TIME") {
      setFilterRoute({ ...filterRoute, TIME: value });
    }
    if (string === "CAR") {
      setFilterRoute({ ...filterRoute, CAR: value });
    }
  };
  const handleChooseRoute = (id) => {
    setDataListRoute(dataListRoute.filter((route) => route.id === id));
    setCurrentBooking(dataListRoute.filter((route) => route.id === id));
  };
  const handleOpenRoute = (id) => {
    setRouteOpen(id);
  };

  useEffect(() => {
    if (step === 1) {
      setDataListRoute(listRouteMain);
    }
  }, [step]);

  const checkStatusSeats = (keyCheck) => {
    const isSelected = seatsNewRequest.selected.some((key) => key === keyCheck);
    const isOccupied = seatsNewRequest.occupied.some((key) => key === keyCheck);
    if (isSelected) {
      return "selected";
    }
    if (isOccupied) {
      return "occupied";
    }
    if (!isSelected && !isOccupied) {
      return "empty";
    }
  };

  const handleSelectSeat = (key, name) => {
    const isSelected = checkStatusSeats(key) === "selected";
    if (!isSelected) {
      setSeatsNewRequest({
        ...seatsNewRequest,
        selected: [...seatsNewRequest.selected, key],
      });
      setListSeatSelected([...listSeatSelected, name]);
    } else {
      setSeatsNewRequest({
        ...seatsNewRequest,
        selected: seatsNewRequest.selected.filter((item) => item !== key),
      });
      setListSeatSelected(listSeatSelected.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    const getDistance = async () => {
      const data = await axios.get(
        `https://secure-fortress-29312.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?destination=${dataBooking.location.pickup.name}&origin=${dataBooking.location.destination.name}&key=AIzaSyCcdhrpyCJYTA-CSSjxnWLZEiJA7UFzWYM&fbclid=IwAR1b6fuTWD3GZonoqVfkTMk61MJJ2bH2yjjcLkU-UsrhdHaPh0jXy8YRtfE`
      );

      const distance = parseInt(
        data.data.routes[0].legs[0].distance.text.split(" ")[0]
      );

      setTypeCar4Price(distance * 6000);
      setTypeCar7Price(distance * 7000);
    };

    getDistance();
  }, []);

  useEffect(() => {
    setTotalTicketRequest(typeCar4Price);
  }, [typeCar4Price]);

  useEffect(() => {
    if (filterRoute.PRICE === "lh") {
      const newData = [...dataListRoute];
      setDataListRoute(newData.sort(compareValues("price", "asc")));
    }
    if (filterRoute.PRICE === "hl") {
      const newData = [...dataListRoute];
      setDataListRoute(newData.sort(compareValues("price", "desc")));
    }
  }, [filterRoute.PRICE]);

  useEffect(() => {
    const compareTime = (time, timeStart, timeEnd) => {
      const newTime = moment.utc(time).format("HH:mm");
      const newTimeCompare = moment(newTime, "HH:mm");
      const newTimeStart = moment(timeStart, "HH:mm");
      const newTimeEnd = moment(timeEnd, "HH:mm");

      if (
        newTimeStart.isBefore(newTimeCompare) &&
        newTimeCompare.isBefore(newTimeEnd)
      ) {
        return true;
      } else {
        return false;
      }
    };

    if (filterRoute.TIME === "0-12") {
      const newData = [...listRouteMain].filter((item) =>
        compareTime(item.time_start, "00:00", "12:00")
      );
      setDataListRoute(newData);
    }
    if (filterRoute.TIME === "12-24") {
      const newData = [...listRouteMain].filter((item) =>
        compareTime(item.time_start, "12:00", "24:00")
      );
      setDataListRoute(newData);
    }
  }, [filterRoute.TIME]);

  useEffect(() => {
    if (filterRoute.CAR === "4s") {
      const newData = [...listRouteMain].filter(
        (item) => item.car_type_id === "4s"
      );
      setDataListRoute(newData);
    }
    if (filterRoute.CAR === "7s") {
      const newData = [...listRouteMain].filter(
        (item) => item.car_type_id === "7s"
      );
      setDataListRoute(newData);
    }
  }, [filterRoute.CAR]);

  function compareValues(key, order = "asc") {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  const [listLocation, setListLocation] = useState({
    pickup: [],
    destination: [],
  });
  const [location, setLocation] = useState({
    pickup: {
      name: "",
      coordinates: {
        lat: "",
        lng: "",
      },
      id: "",
    },
    destination: {
      name: "",
      coordinates: {
        lat: "",
        lng: "",
      },
      id: "",
    },
  });
  useEffect(() => {
    if (!dataBooking) return;
    setLocation(dataBooking.location);
    setDateGo(dataBooking.date_department);
  }, [dataBooking]);
  const getListLocation = async (input, string) => {
    var config = {
      method: "get",
      url: `https://secure-fortress-29312.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?`,
      headers: {},
      params: {
        query: input,
        key: "AIzaSyCcdhrpyCJYTA-CSSjxnWLZEiJA7UFzWYM",
        region: "VN",
        language: "vi",
      },
    };
    const dataLocation = [];
    const dataRes = await axios(config);
    const newData = dataRes.data.results.map((location) => {
      return {
        name: location.formatted_address,
        coordinates: {
          lat: location.geometry.location.lat,
          lng: location.geometry.location.lng,
        },
        id: location.place_id,
      };
    });

    if (string === "pickup") {
      setListLocation({ ...listLocation, pickup: newData });
    }
    if (string === "destination") {
      setListLocation({ ...listLocation, destination: newData });
    }

    return dataLocation;
  };

  const handleSearchPickup = (newValue) => {
    if (newValue) {
      getListLocation(newValue, "pickup");
    } else {
      setListLocation({ ...listLocation, pickup: [] });
    }
  };

  const handleChangePickup = (newValue) => {
    const newLocation = listLocation.pickup.find(
      (item) => item.id === newValue
    );
    setLocation({ ...location, pickup: newLocation });
  };
  const handleSearchDestination = (newValue) => {
    if (newValue) {
      getListLocation(newValue, "destination");
    } else {
      setListLocation({ ...listLocation, destination: [] });
    }
  };

  const handleChangeDestination = (newValue) => {
    const newLocation = listLocation.destination.find(
      (item) => item.id === newValue
    );
    setLocation({ ...location, destination: newLocation });
  };

  return (
    <div className="choose-route">
      {step === 1 && (
        <>
          <div className="choose-route-filter">
            <Select
              placeholder="Price"
              bordered={false}
              className="choose-route-filter-button"
              onChange={(value) => handleChangeFilter(value, "PRICE")}
              value={filterRoute.PRICE}
              allowClear
              onClear={() => setDataListRoute(listRouteMain)}
            >
              <Option value="lh">Low to High</Option>
              <Option value="hl">High to Low</Option>
            </Select>
            <Select
              placeholder="Car"
              bordered={false}
              className="choose-route-filter-button"
              value={filterRoute.CAR}
              onChange={(value) => handleChangeFilter(value, "CAR")}
              allowClear
              onClear={() => setDataListRoute(listRouteMain)}
            >
              <Option value="4s">4 seats</Option>
              <Option value="7s">7 seats</Option>
            </Select>
            <Select
              placeholder="Time"
              bordered={false}
              className="choose-route-filter-button"
              value={filterRoute.TIME}
              onChange={(value) => handleChangeFilter(value, "TIME")}
              allowClear
              onClear={() => setDataListRoute(listRouteMain)}
            >
              <Option value="0-12">0h - 12h</Option>
              <Option value="12-24">12h - 24h</Option>
            </Select>
          </div>
          <div className="choose-route-title">Choice route you want</div>
        </>
      )}
      {step === 1 && (
        <div className="choose-route-request">
          <div className="choose-route-request-title">
            Create your own trip with just 3 easy steps.
          </div>
          <Row align="bottom">
            <Col span={20} className="choose-route-request-steps">
              <div className="choose-route-request-steps-step">
                <div className="choose-route-request-steps-step-icon">
                  <img
                    src={require("../../assets/images/icon_step1_request.png")}
                    alt=""
                    height={36}
                    width={36}
                  />
                </div>
                <div className="choose-route-request-steps-step-title">
                  Fill your request
                </div>
              </div>
              <img
                src={require("../../assets/images/icon_line_request.png")}
                alt=""
                height={60}
                width={60}
              />
              <div className="choose-route-request-steps-step">
                <div className="choose-route-request-steps-step-icon">
                  <img
                    src={require("../../assets/images/icon_step2_request.png")}
                    alt=""
                    height={36}
                    width={36}
                  />
                </div>
                <div className="choose-route-request-steps-step-title">
                  Waiting for your driver
                </div>
              </div>
              <img
                src={require("../../assets/images/icon_line_request.png")}
                alt=""
                height={60}
                width={60}
              />
              <div className="choose-route-request-steps-step">
                <div className="choose-route-request-steps-step-icon">
                  <img
                    src={require("../../assets/images/icon_step3_request.png")}
                    alt=""
                    height={36}
                    width={36}
                  />
                </div>
                <div className="choose-route-request-steps-step-title">
                  Payment
                </div>
              </div>
            </Col>
            <Col
              span={4}
              className="choose-route-request-button"
              onClick={() => {
                setIsRequestRoute(true);
                setCurrentStep(currentStep + 1);
              }}
            >
              Request
            </Col>
          </Row>
        </div>
      )}
      {!isRequestRoute &&
        dataListRoute.map((route) => (
          <ChooseCarItem
            step={step}
            setCurrentStep={setCurrentStep}
            route={route}
            key={route.id}
            handleChooseRoute={handleChooseRoute}
            getInfoTicket={getInfoTicket}
            isOpen={routeOpen === route.id}
            handleOpenRoute={handleOpenRoute}
            checkStatusSeats={checkStatusSeats}
            handleSelectSeat={handleSelectSeat}
            isRequestRoute={isRequestRoute}
            distance={sumDistance}
          />
        ))}
      {isRequestRoute && step === 2 && (
        <div className="choose-route-request-new">
          <div className="choose-route-request-new-title">
            Create your custom trip:
          </div>
          <Row className="choose-route-request-new-container container">
            <Col span={12} className="choose-route-request-new-container-info">
              <div className="choose-route-request-new-container-info-item">
                <div className="choose-route-request-new-container-info-item-label">
                  Date
                </div>
                <div className="choose-route-request-new-container-info-item-input">
                  <DatePicker
                    onChange={(value) => setDateGo(value)}
                    style={{ height: "50px" }}
                    value={dateGo}
                    disabledDate={(d) =>
                      !d || d.isBefore(moment().subtract(1, "d"))
                    }
                  />
                </div>
              </div>
              <div className="choose-route-request-new-container-info-item">
                <div className="choose-route-request-new-container-info-item-label">
                  Time
                </div>
                <div className="choose-route-request-new-container-info-item-input">
                  <TimePicker
                    onChange={(value) => setTimeGo(value)}
                    format={"HH:mm"}
                    style={{ height: "50px" }}
                    value={timeGo}
                  />
                </div>
              </div>
              <div className="choose-route-request-new-container-info-item">
                <div className="choose-route-request-new-container-info-item-label">
                  Car type
                </div>
                <div className="choose-route-request-new-container-info-item-input">
                  <Select
                    showSearch
                    placeholder="Select a car type"
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setCarType(value);
                      if (value === "car4") {
                        setSeatsNewRequest(seatChartCar4);
                        setTotalTicketRequest(typeCar4Price);
                        setListSeatSelected([]);
                      }
                      if (value === "car7") {
                        setTotalTicketRequest(typeCar7Price);
                        setSeatsNewRequest(seatChartCar7);
                        setListSeatSelected([]);
                      }
                    }}
                    value={carType}
                  >
                    <Option value="car4">4 Seats</Option>
                    <Option value="car7">7 Seats</Option>
                  </Select>
                </div>
              </div>
            </Col>
            <Col span={12} className="choose-route-request-new-container-pick">
              <div className="choose-route-request-new-container-pick-header">
                Choose seats
              </div>
              <div className="choose-route-request-new-container-pick-car">
                {carType === "car7" && (
                  <Car7Seats
                    seats={seatsNewRequest}
                    setSeats={setSeatsNewRequest}
                    checkStatusSeats={checkStatusSeats}
                    handleSelectSeat={handleSelectSeat}
                  />
                )}
                {carType === "car4" && (
                  <Car4Seats
                    seats={seatsNewRequest}
                    setSeats={setSeatsNewRequest}
                    checkStatusSeats={checkStatusSeats}
                    handleSelectSeat={handleSelectSeat}
                  />
                )}
              </div>
              <div className="choose-route-request-new-container-pick-footer">
                <div className="choose-route-request-new-container-pick-footer-item">
                  <MdEventSeat
                    size={40}
                    color={"black"}
                    style={{ marginBottom: "8px" }}
                  />
                  Occupied
                </div>
                <div className="choose-route-request-new-container-pick-footer-item">
                  <MdEventSeat
                    size={40}
                    color={"white"}
                    style={{ marginBottom: "8px" }}
                  />
                  Empty
                </div>
                <div className="choose-route-request-new-container-pick-footer-item">
                  <MdEventSeat
                    size={40}
                    color={"aqua"}
                    style={{ marginBottom: "8px" }}
                  />
                  Selected
                </div>
              </div>
            </Col>
            <Col span={24} className="choose-route-request-new-container-total">
              <span
                style={{
                  fontSize: "15px",
                  color: "black",
                  marginRight: "8px",
                }}
              >
                Total estimate:
              </span>
              {listSeatSelected.length
                ? Math.floor(totalTicketRequest / listSeatSelected.length)
                : 0}
              <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                VND/Seat
              </span>
            </Col>
            <Col
              span={24}
              className="choose-route-request-new-container-location"
            >
              <div className="choose-route-request-new-container-location-item">
                <div className="choose-route-request-new-container-location-item-label">
                  Pickup location
                </div>
                <div className="choose-route-request-new-container-location-item-choose">
                  <Select
                    showSearch
                    value={location.pickup.name}
                    placeholder="Enter pickup location"
                    className="home-booking-section-choose-input"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={handleSearchPickup}
                    onChange={handleChangePickup}
                    notFoundContent={null}
                  >
                    {listLocation.pickup.map((location) => (
                      <Option value={location.id} key={location.id}>
                        {location.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="choose-route-request-new-container-location-item">
                <div className="choose-route-request-new-container-location-item-label">
                  Destination
                </div>
                <div className="choose-route-request-new-container-location-item-choose">
                  <Select
                    showSearch
                    value={location.destination.name}
                    placeholder="Enter destination"
                    className="home-booking-section-choose-input"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={handleSearchDestination}
                    onChange={handleChangeDestination}
                    notFoundContent={null}
                  >
                    {listLocation.destination.map((location) => (
                      <Option value={location.id} key={location.id}>
                        {location.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
      <Row className="buy-ticket-navigate">
        <Col
          span={8}
          offset={currentStep === 1 ? 8 : 0}
          className="buy-ticket-navigate-back"
          onClick={() => {
            currentStep === 1 && navigate("/");
            currentStep > 1 && setCurrentStep(currentStep - 1);
          }}
        >
          <LeftOutlined className="buy-ticket-navigate-back-icon" />
          Back
        </Col>
        {currentStep === 2 && (
          <Col
            span={8}
            className="buy-ticket-navigate-continue"
            onClick={() => {
              if (
                isRequestRoute &&
                listSeatSelected.length &&
                location.pickup &&
                location.destination &&
                timeGo &&
                dateGo &&
                carType
              ) {
                getInfoRequest("getRoute", {
                  pickup_location: location.pickup,
                  destination: location.destination,
                  time: moment(timeGo).format("HH:mm"),
                  date: moment(dateGo).format("YYYY-MM-DD"),
                  seats: listSeatSelected,
                  status: "Waiting",
                  total: totalTicketRequest,
                  carType: carType,
                });
                setCurrentStep(currentStep + 1);
              }
              if (!isRequestRoute) {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            Continue
            <RightOutlined className="buy-ticket-navigate-continue-icon" />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ChooseRoute;
