import React from "react";
import Seat from "../Seat/Seat";
import { Col, Row } from "antd";

const Car7Seats = ({ seats, setSeats, checkStatusSeats, handleSelectSeat }) => {
  return (
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
        span={6}
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
        span={6}
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
      <Col
        span={6}
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "10px",
        }}
      >
        <Seat
          key={seats.seats[4].key}
          name={seats.seats[4].name}
          keySeat={seats.seats[4].key}
          status={checkStatusSeats(seats.seats[4].key)}
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
          key={seats.seats[5].key}
          name={seats.seats[5].name}
          keySeat={seats.seats[5].key}
          status={checkStatusSeats(seats.seats[5].key)}
          handleSelectSeat={handleSelectSeat}
        />
      </Col>
      <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
        <Seat
          key={seats.seats[6].key}
          name={seats.seats[6].name}
          keySeat={seats.seats[6].key}
          status={checkStatusSeats(seats.seats[6].key)}
          handleSelectSeat={handleSelectSeat}
        />
      </Col>
    </Row>
  );
};

export default Car7Seats;
