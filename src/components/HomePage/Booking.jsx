import { DatePicker, notification, Select } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBooking } from "../../redux/slices/bookingSlice";
import "./Booking.scss";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  MarkerF,
} from "@react-google-maps/api";

const { Option } = Select;

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Fill information",
    description: "Please fill all information to request route",
  });
};
const libraries = ["places"];
const Booking = () => {
  const [center, setCenter] = useState({ lat: 16.0544563, lng: 108.1927329 });
  const [dateDepartment, setDateDepartment] = useState();
  const role = useSelector((state) => state.auth.role);
  const [location, setLocation] = useState({
    pickup: {
      name: undefined,
      coordinates: {
        lat: "",
        lng: "",
      },
      id: "",
    },
    destination: {
      name: undefined,
      coordinates: {
        lat: "",
        lng: "",
      },
      id: "",
    },
  });
  const [listLocation, setListLocation] = useState({
    pickup: [],
    destination: [],
  });

  const dataBooking = useSelector((state) => state.booking);
  let libRef = React.useRef(libraries);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCcdhrpyCJYTA-CSSjxnWLZEiJA7UFzWYM",
    libraries: libRef.current,
  });

  useEffect(() => {
    setLocation(dataBooking.location);
    setDateDepartment(dataBooking.date_department);
  }, []);

  const onChangeDate = (date, dateString) => {
    setDateDepartment(date);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    if (location.destination.coordinates.lat) {
      setCenter({
        lat: parseFloat(location.destination.coordinates.lat),
        lng: parseFloat(location.destination.coordinates.lng),
      });
    }
    if (location.pickup.coordinates.lat) {
      setCenter({
        lat: parseFloat(location.pickup.coordinates.lat),
        lng: parseFloat(location.pickup.coordinates.lng),
      });
    }

    async function calculateRoute() {
      if (
        location.pickup.coordinates.lat === "" ||
        location.destination.coordinates.lat === ""
      ) {
        return;
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: location.pickup.coordinates,
        destination: location.destination.coordinates,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
    }

    calculateRoute();
  }, [location.destination.coordinates, location.pickup.coordinates]);

  return (
    <div style={{ display: "flex" }}>
      <div
        className="home-booking"
        style={role === "driver" ? { height: "400px" } : {}}
      >
        <div className="home-booking-title">
          {role === "driver" ? "Let take a trip" : "Make your trip"}
        </div>
        <div className="home-booking-section">
          <div className="home-booking-section-title">Pickup</div>
          <div className="home-booking-section-choose">
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
        {role !== "driver" && (
          <div className="home-booking-section">
            <div className="home-booking-section-title">Destination</div>
            <div className="home-booking-section-choose">
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
        )}
        <div className="home-booking-section">
          <div className="home-booking-section-title">Date of department</div>
          <div className="home-booking-section-choose">
            <DatePicker
              placeholder="Select date of department"
              onChange={onChangeDate}
              style={{ height: "48px" }}
              value={dateDepartment}
              disabledDate={(d) => !d || d.isBefore(moment().subtract(1, "d"))}
            />
          </div>
        </div>

        <button
          className="home-booking-get-car"
          style={{ marginTop: "18px" }}
          onClick={() => {
            dispatch(
              setBooking({
                location: location,
                date_department: dateDepartment,
              })
            );
            if (location.pickup.name && dateDepartment) {
              if (role === "driver") {
                navigate("/book-driver");
              } else {
                navigate("/buy-ticket");
              }
            } else {
              openNotificationWithIcon("warning");
            }
          }}
        >
          {role === "driver" ? "Take now" : "Request now"}
        </button>
      </div>
      <div
        className="home-map"
        style={role === "driver" ? { height: "400px" } : {}}
      >
        {isLoaded && location.pickup.name && (
          <GoogleMap
            center={center}
            zoom={13.5}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <MarkerF position={center} key={location.pickup.id} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default Booking;
