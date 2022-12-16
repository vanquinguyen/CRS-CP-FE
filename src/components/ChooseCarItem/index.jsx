import { RightOutlined } from "@ant-design/icons";
import { Select } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { MdEventSeat } from "react-icons/md";
import Car4Seats from "../Cars/Car4Seats";
import Car7Seats from "../Cars/Car7Seats";
import "./index.scss";

const { Option } = Select;

const calculatePrice = (price, totalSeat, distanceList, distance) => {
  if (totalSeat === 0) return 0;

  let sumDistance = 0;

  distanceList.forEach((item) => {
    sumDistance += item.distance * item.seat;
  });

  sumDistance += distance * totalSeat;

  return Math.floor((price / sumDistance) * distance);
};

const ChooseCarItem = ({
  step,
  setCurrentStep,
  route,
  handleChooseRoute,
  getInfoTicket,
  isOpen,
  handleOpenRoute,
  distance,
}) => {
  const [seats, setSeats] = useState(route.seat);

  const [listSeatSelected, setListSeatSelected] = useState([]);

  const checkStatusSeats = (keyCheck) => {
    const isSelected = seats.selected.some((key) => key === keyCheck);
    const isOccupied = seats.occupied.some((key) => key === keyCheck);
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
      setSeats({ ...seats, selected: [...seats.selected, key] });
      setListSeatSelected([...listSeatSelected, name]);
    } else {
      setSeats({
        ...seats,
        selected: seats.selected.filter((item) => item !== key),
      });
      setListSeatSelected(listSeatSelected.filter((item) => item !== name));
    }
  };

  return (
    <div className={isOpen ? "choose-car-item active" : "choose-car-item"}>
      <div className="choose-car-item-header">
        <div className="choose-car-item-header-car">
          <div className="choose-car-item-header-car-avatar">
            <img src={route.avatar} alt="" width={70} height={70} />
          </div>
          <div className="choose-car-item-header-car-info">
            <div className="choose-car-item-header-car-info-name">
              {route.name_company}
            </div>
            <div className="choose-car-item-header-car-info-car">
              <div className="choose-car-item-header-car-info-car-type">
                {route.car_type}
              </div>
              <span style={{ padding: "0 2px 0 2px", fontWeight: 300 }}>|</span>
              <div className="choose-car-item-header-car-info-car-seats">
                Con {route.seat.seats.length - route.seat.occupied.length} Cho
              </div>
            </div>
          </div>
        </div>
        <div className="choose-car-item-header-route">
          <div className="choose-car-item-header-route-begin">
            <div className="choose-car-item-header-route-begin-time">
              {moment.utc(route.time_start).format("HH:mm")}
            </div>
            <div className="choose-car-item-header-route-begin-location">
              {route.pickup_location}
            </div>
          </div>
          <div className="choose-car-item-header-route-line"></div>
          <div className="choose-car-item-header-route-icon">
            <div className="choose-car-item-header-route-icon-time-total">
              {moment
                .duration(moment(route.time_end).diff(moment(route.time_start)))
                .asHours()}
              h
            </div>
            <img
              src={require("../../assets/images/icon_bus.png")}
              alt=""
              height={30}
              width={41}
            />
          </div>
          <div className="choose-car-item-header-route-line"></div>

          <div className="choose-car-item-header-route-end">
            <div className="choose-car-item-header-route-end-time">
              {moment.utc(route.time_end).format("HH:mm")}
            </div>
            <div className="choose-car-item-header-route-end-location">
              {route.destination}
            </div>
          </div>
        </div>
      </div>
      <div className="choose-car-item-info">
        <div className="choose-car-item-info-price">
          <div className="choose-car-item-info-price-company">
            Created by {route.name_company} company
          </div>
        </div>
        {step === 1 && (
          <div
            className={
              isOpen
                ? "choose-car-item-info-choose active"
                : "choose-car-item-info-choose"
            }
            onClick={() =>
              isOpen ? handleOpenRoute(null) : handleOpenRoute(route.id)
            }
          >
            Pick
          </div>
        )}
      </div>
      {isOpen && step === 1 && (
        <div className="choose-car-item-main">
          <div className="choose-car-item-main-pick">
            <div className="choose-car-item-main-pick-header">Select seats</div>
            <div className="choose-car-item-main-pick-main">
              {route.car_type_id === "car7" && (
                <Car7Seats
                  seats={seats}
                  setSeats={setSeats}
                  checkStatusSeats={checkStatusSeats}
                  handleSelectSeat={handleSelectSeat}
                />
              )}
              {route.car_type_id === "car4" && (
                <Car4Seats
                  seats={seats}
                  setSeats={setSeats}
                  checkStatusSeats={checkStatusSeats}
                  handleSelectSeat={handleSelectSeat}
                />
              )}
            </div>
            <div className="choose-car-item-main-pick-footer">
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
          </div>
          <div className="choose-car-item-main-footer">
            <div className="choose-car-item-main-footer-ticket">
              <div className="choose-car-item-main-footer-ticket-list">
                {seats.selected.length} tickets: {listSeatSelected.toString()}
              </div>
              <div className="choose-car-item-main-footer-ticket-price">
                <span
                  style={{
                    color: "black",
                    fontSize: "16px",
                    marginRight: "8px",
                  }}
                >
                  Price:
                </span>
                {calculatePrice(
                  route.price,
                  seats.selected.length,
                  route.distanceList,
                  distance
                )}
                <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                  VND/Person
                </span>
              </div>
            </div>
            <div
              className="choose-car-item-main-footer-continue"
              onClick={() => {
                if (!seats.selected.length) return;
                handleChooseRoute(route.id);
                getInfoTicket("getRoute", {
                  booking_id: route.id,
                  car_id: route.car_id,
                  pickup_location: route.pickup_location,
                  destination: route.destination,
                  time: route.time_start,
                  seats: listSeatSelected,
                  status: route.status,
                  total:
                    seats.selected.length *
                    calculatePrice(
                      route.price,
                      seats.selected.length,
                      route.distanceList,
                      distance
                    ),
                  ticket_price: route.price,
                });
                setCurrentStep(2);
              }}
            >
              Continue
              <RightOutlined className="choose-car-item-main-footer-continue-icon" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseCarItem;
