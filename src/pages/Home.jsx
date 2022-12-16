import React, { useState } from "react";
import { withHeaderHOC } from "../components/Header/withHeaderHOC";
import HomePage from "../components/HomePage";
import DetailingTrip from "../components/DetaillingTrip";
import HandleTripDriver from "../components/HandleTripDriver";
import { useEffect } from "react";
import axios from "axios";
import { KEY_API_MAP_GG, STATUS_TICKET } from "../constants";
import { useSelector } from "react-redux";



const Home = () => {
  const [data, setData] = useState([]);
  const auth = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getTrip = async () => {
      const payload = {
        driver_id: user.userId,
      };

      await axios
        .post("http://localhost:5000/api/booking/getTrip/", payload)
        .then((res) => {
          console.log(res.data.data);
          setData(res.data.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getTrip();
  }, []);

  return (
    <div>
      {auth.role === "driver" ? (
        data ? (
          data.status_driver === STATUS_TICKET.WAITING_FOR_DRIVING ||
          data.status_driver === STATUS_TICKET.DRIVING ? (
            <DetailingTrip data1={data} />
          ) : (
            <HomePage />
          )
        ) : (
          <HomePage />
        )
      ) : (
        <HomePage />
      )}
    </div>
  );
};

// call api for check

export default withHeaderHOC(Home);
