import React from "react";
import Seat from "../Seat/Seat";
import { Col, Row } from "antd";

const Car4Seats = ({ seats, setSeats, checkStatusSeats, handleSelectSeat }) => {
  return (
    <div className="car-4-seats">
      <Row className="car-7-seats" align="center">
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
        >
          <Seat
            key={seats.seats[0].key}
            name={seats.seats[0].name}
            keySeat={seats.seats[0].key}
            status={checkStatusSeats(seats.seats[0].key)}
            handleSelectSeat={handleSelectSeat}
          />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
        >
          <Seat
            key={seats.seats[1].key}
            name={seats.seats[1].name}
            keySeat={seats.seats[1].key}
            status={checkStatusSeats(seats.seats[1].key)}
            handleSelectSeat={handleSelectSeat}
          />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
        >
          <Seat
            key={seats.seats[2].key}
            name={seats.seats[2].name}
            keySeat={seats.seats[2].key}
            status={checkStatusSeats(seats.seats[2].key)}
            handleSelectSeat={handleSelectSeat}
          />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
        >
          <Seat
            key={seats.seats[3].key}
            name={seats.seats[3].name}
            keySeat={seats.seats[3].key}
            status={checkStatusSeats(seats.seats[3].key)}
            handleSelectSeat={handleSelectSeat}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Car4Seats;
