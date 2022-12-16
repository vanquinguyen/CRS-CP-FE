import moment from "moment";
import React from "react";
import Countdown from "react-countdown";
import { STATUS_TICKET } from "../../constants";
import styles from "./CoutDownwithActive.module.scss";
import classNames from "classnames/bind";
import axios from "axios";

const cx = classNames.bind(styles);
function CoutDownwithActive({ status, setStatus, timeStart }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const activeTrip = async () => {
    const payload = {
      driver_id: user.userId,
    };

    await axios
      .post("http://localhost:5000/api/booking/activeTrip/", payload)
      .catch((error) => {
        console.log(error.message);
      });
  }
  const RenderTime = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setStatus();
      activeTrip();
    } else {
      return (
        <div>
          <div class={cx("container")}>
            <h1 className={cx("h1")}>Trip starts in :</h1>
            <div>
              <ul className={cx("ul")}>
                <li className={cx("li")}>
                  <span className={cx("span")}>{days}</span>days
                </li>
                <li className={cx("li")}>
                  <span className={cx("span")}>{hours}</span>Hours
                </li>
                <li className={cx("li")}>
                  <span className={cx("span")}>{minutes}</span>Minutes
                </li>
                <li className={cx("li")}>
                  <span className={cx("span")}>{seconds}</span>Seconds
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  };
  const Render = () => {
    const time = moment(timeStart).diff(moment(), "second", true);

    console.log("time:", timeStart, moment())
    return time > 0 ? (
      <Countdown
        date={
          // Date.now() + moment(timeStart).diff(moment(), "second", true) * 1000
          moment(timeStart).add(-7, 'h')
        }
        renderer={RenderTime}
      />
    ) : (
      <div
        className={cx("container")}
        style={{ backgroundColor: "transparent" }}
      >
        <h1 className={cx("wish")}>Have a safe trip</h1>
      </div>
    );
  };
  return (
    <div>
      {status !== STATUS_TICKET.WAITING_FOR_DRIVING ? (
        <div
          className={cx("container")}
          style={{ backgroundColor: "transparent" }}
        >
          <h1 className={cx("wish")}>Have a safe trip</h1>
        </div>
      ) : (
        <Render />
      )}
    </div>
  );
}

export default CoutDownwithActive;
