import React from "react";
import "./Seat.scss";
import { MdEventSeat } from "react-icons/md";

const STATUS = {
  OCCUPIED: "occupied",
  SELECTED: "selected",
  EMPTY: "empty",
};

const Seat = ({ status, keySeat, handleSelectSeat, name }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      onClick={() => {
        status !== "occupied" && handleSelectSeat(keySeat, name);
      }}
    >
      {status === "empty" && (
        <MdEventSeat
          size={40}
          color={"white"}
          style={{ marginBottom: "4px", cursor: "pointer" }}
        />
      )}
      {status === "occupied" && (
        <MdEventSeat
          size={40}
          color={"black"}
          style={{ marginBottom: "4px" }}
        />
      )}
      {status === "selected" && (
        <MdEventSeat
          size={40}
          color={"aqua"}
          style={{ marginBottom: "4px", cursor: "pointer" }}
        />
      )}
      {name}
    </div>
  );
};

export default Seat;
