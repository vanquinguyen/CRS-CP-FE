import React from "react";
import HandleTripDriver from "../HandleTripDriver";
import Booking from "./Booking";
import "./index.scss";

const HomePage = () => {
  return (
    <div className="home">
      
      <div className="home-banner ">
        <div className="home-container container">
          <Booking />
        </div>
      </div>
      <div
        className="home-nothing"
        style={{
          backgroundImage: `url("https://www.china-airlines.com/sea/vi/Images/KHH-001-banner_tcm322-37092.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          className="container"
          style={{ paddingTop: "90px", paddingBottom: "90px" }}
        >
          <div
            className="nothing-title"
            style={{ fontSize: "28px", fontWeight: "600" }}
          >
            Vastum for Business
          </div>

          <div
            className="nothing-content"
            style={{ fontSize: "16px", marginTop: "12px" }}
          >
            Transform the way your company moves and feeds its people.
          </div>
          <div
            className="nothing-button"
            style={{
              fontSize: "20px",
              marginTop: "30px",
              fontWeight: "700",
              backgroundColor: "black",
              color: "white",
              width: "120px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            See how
          </div>
        </div>
      </div>
      <div className="home-nothing1" style={{}}>
        <div
          className="container"
          style={{ paddingTop: "70px", paddingBottom: "0px" }}
        >
          <div
            className="nothing1-title"
            style={{ fontSize: "28px", fontWeight: "600" }}
          >
            Save a lots of money with Vastum
          </div>
          <div
            className="nothing1-content"
            style={{ fontSize: "16px", marginTop: "12px" }}
          >
            With each trip, you will save 10-100$ for you, members save an
            average of $22 per month.
          </div>
          <div
            className="nothing1-button"
            style={{
              fontSize: "20px",
              marginTop: "30px",
              fontWeight: "700",
              backgroundColor: "black",
              color: "white",
              width: "200px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            Sign up to save
          </div>
          <img
            width={"100%"}
            alt=""
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80"
            className="nothing1_image"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
