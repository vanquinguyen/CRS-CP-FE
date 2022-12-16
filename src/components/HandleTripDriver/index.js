import styles from "./HandleTripDriver.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import moment from "moment";
import { Row, Col, Button, Modal, List } from "antd";
import { FaCalendar } from "react-icons/fa";
import { IoPerson, IoLocationOutline } from "react-icons/io5";
import { AiFillPhone, AiOutlineCheckCircle } from "react-icons/ai";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { BsCircle } from "react-icons/bs";
import axios from "axios";
import { GrMapLocation } from "react-icons/gr";

const cx = classNames.bind(styles);
const DATA = {
  id: 1,
  role: "driver",
  status_driver: 0,
  time_stop: "",
  address_start: "123 Lý Văn Phức , Hòa Hải , Ngũ Hành Sơn , Đà Nẵng",
  time_start: "2022-09-12T20:05:30.45",
  address_stop: "123 Lý Văn Phức , Hòa Hải , Ngũ Hành Sơn , Đà Nẵng",
  list_customer: [
    {
      id_customer: "c2",
      name_customer: "Ngoc Trinh ",
      amount_customer: 2,
      phone_number: "0123123123",
      address_start: " Mỹ An , Ngũ Hành Sơn , Đà Nẵng",
      address_stop: "  Bùi Điền, Hương Xuân, Hương Trà, Thừa Thiên Huế ",
      pickup: false,
      dropoff: false,
      total: "1.500.000",
    },
    {
      id_customer: "c4",
      name_customer: "Ngoc Trinh ",
      amount_customer: 2,
      phone_number: "0123123123",
      address_start: " Hoà Khánh Nam, Liên Chiểu, Đà Nẵng, Việt Nam",
      address_stop: "  Bùi Điền, Hương Xuân, Hương Trà, Thừa Thiên Huế ",
      pickup: false,
      dropoff: false,
      total: "1.500.000",
    },
    {
      id_customer: "c1",
      avatar_customer:
        "https://images.pexels.com/photos/2625122/pexels-photo-2625122.jpeg?cs=srgb&dl=pexels-ali-pazani-2625122.jpg&fm=jpg",
      name_customer: "Ngoc Trinh ",
      amount_customer: 2,
      phone_number: "0123123123",
      address_start: "  Hòa Hải , Ngũ Hành Sơn , Đà Nẵng",
      address_stop: "Lý Thần Tông, Hương Chữ, Hương Trà, Thừa Thiên Huế",
      pickup: false,
      dropoff: false,

      total: "1.500.000",
    },

    {
      id_customer: "c3",
      name_customer: "Ngoc Trinh ",
      amount_customer: 2,
      phone_number: "0123123123",
      address_start: " Khuê Trung ,Cẩm Lệ , Đà Nẵng",
      address_stop: "  Nguyên Giáp, An Đông, Thành phố Huế, Thừa Thiên Huế",
      pickup: false,
      dropoff: false,

      total: "1.500.000",
    },
  ],
};
function HandleTripDriver() {
  const [dataHandleTrip, setDataHandleTrip] = useState(
    // {
    // id: 0,
    // status_driver: 0,
    // time_stop: "",
    // time_start: "",
    // list_customer: [
    //   {
    //     id_customer: "",
    //     name_customer: " ",
    //     amount_customer: 0,
    //     phone_number: "0",
    //     address: "",
    //     pickup: "",
    //     total: "",
    //   },
    // ],}
    DATA
  );
  const [timeLeft, setTimeLeft] = useState();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(true);
  const [listorderstart, setListorderstart] = useState([]);
  const [listorderstop, setListorderstop] = useState([]);
  const [location, setLocation] = useState();
  const [listorder, setListorder] = useState();
  const [locationPlace, setLocationPlace] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  const [opendetailsModal, setOpendetailsModal] = useState(false);
  const [indexofNodePlace, setIndexofNodePlace] = useState();
  // api
  useEffect(() => {
    async function asyncGetListPlace() {
      let stop = [];
      let start = [];
      dataHandleTrip.list_customer.map((customer) => {
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${customer.address_start}.json?access_token=pk.eyJ1IjoidHViYWRpZW4iLCJhIjoiY2w2Nm4zaW5hMGQ1eTNlbzF5Z2Z0N2YwZiJ9.fSXO4DHBOsXyrNQrkXL6RA`
          )
          .then(function (response) {
            // console.log(response);
            start.push({
              id: customer.id_customer,
              loca: {
                lon: response.data.features[0].center[0],
                lat: response.data.features[0].center[1],
              },
            });
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${customer.address_stop}.json?access_token=pk.eyJ1IjoidHViYWRpZW4iLCJhIjoiY2w2Nm4zaW5hMGQ1eTNlbzF5Z2Z0N2YwZiJ9.fSXO4DHBOsXyrNQrkXL6RA`
          )
          .then(function (response) {
            // console.log(response);
            stop.push({
              id: customer.id_customer,
              loca: {
                lon: response.data.features[0].center[0],
                lat: response.data.features[0].center[1],
              },
            });
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      });
      setListorderstart(start);
      setListorderstop(stop);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var locationMarker = null;
          if (locationMarker) {
            // return if there is a locationMarker bug
            return;
          }

          // sets default position to your position
          var lat = position.coords["latitude"];
          var lon = position.coords["longitude"];

          setLocation({ lat: lat, lon: lon });
          axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?country=vn&types=place%2Cpostcode%2Caddress&language=en&limit=1&access_token=pk.eyJ1IjoidHViYWRpZW4iLCJhIjoiY2w2Nm4zaW5hMGQ1eTNlbzF5Z2Z0N2YwZiJ9.fSXO4DHBOsXyrNQrkXL6RA`
            )
            .then(function (response) {
              setLocationPlace(response.data.features[0].place_name);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });
        },
        function (error) {
          console.log("Error: ", error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    }
    asyncGetListPlace();
  }, [dataHandleTrip]);

  useEffect(() => {
    const getTrip = async () => {
      let payload = {
        driver_id: user.userId,
      };

      await axios
        .post("http://localhost:5000/api/booking/getTrip/", payload)
        .then((res) => {
          if (res.data.status === "success") setDataHandleTrip(res.data.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    getTrip();
  }, []);
  function getListOder() {
    if (listorderstart.length >= 1) {
      let distanceStart = [];
      let distanceStop = [];
      for (
        let index = 0;
        index < dataHandleTrip.list_customer.length;
        index++
      ) {
        axios
          .get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${
              location.lon
            },${location.lat};${listorderstart[[index]].loca.lon},${
              listorderstart[[index]].loca.lat
            }.json?access_token=pk.eyJ1IjoidHViYWRpZW4iLCJhIjoiY2w2Nm4zaW5hMGQ1eTNlbzF5Z2Z0N2YwZiJ9.fSXO4DHBOsXyrNQrkXL6RA`
          )
          .then(function (response) {
            distanceStart.push({
              id: listorderstart[index].id,
              status: dataHandleTrip.list_customer[index].pickup,
              place: dataHandleTrip.list_customer[index].address_start,
              distance: response.data.routes[0].distance,
            });
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
        axios
          .get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${
              location.lon
            },${location.lat};${listorderstop[[index]].loca.lon},${
              listorderstop[[index]].loca.lat
            }.json?access_token=pk.eyJ1IjoidHViYWRpZW4iLCJhIjoiY2w2Nm4zaW5hMGQ1eTNlbzF5Z2Z0N2YwZiJ9.fSXO4DHBOsXyrNQrkXL6RA`
          )
          .then(function (response) {
            distanceStop.push({
              id: listorderstart[index].id,
              status: dataHandleTrip.list_customer[index].dropoff,
              place: dataHandleTrip.list_customer[index].address_stop,
              distance: response.data.routes[0].distance,
            });
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });

        // console.log(
        //   distanceStart.sort(function (a, b) {
        //     return a.distance - b.distance;
        //   })
        // );
        // console.log(distanceStop);
      }
      return {
        start: distanceStart,
        stop: distanceStop,
      };
    }
  }

  //modal Pickup customer

  // modal Active Driver ,,, update status driver

  //modal Pickup customer

  const hideModalPickup = () => {
    setOpendetailsModal({ ...opendetailsModal, status: false });
  };

  // modal Active Driver ,,, update status driver
  const showModalActive = () => {
    setVisible(true);
  };
  const hideModalActive = () => {
    setVisible(false);
  };
  const hideModalActivevsACtive = async () => {
    setDataHandleTrip((dataHandleTrip) => ({
      ...dataHandleTrip,
      status_driver: 1,
    }));
    setVisible(false);

    let payload = {
      driver_id: user.userId,
    };

    await axios
      .post("http://localhost:5000/api/booking/activeTrip/", payload)
      .catch((error) => {
        console.log(error.message);
      });
  };
  // render list customer
  function RenderListCustomer({ id, drirection }) {
    return (
      <>
        {dataHandleTrip.list_customer.map((customerInfor, index) => {
          if (customerInfor.id_customer == id) {
            return (
              <div key={customerInfor.id_customer}>
                <div>
                  <IoPerson className={cx("icon")} />
                  Name: {customerInfor.name_customer}
                </div>
                <div>
                  <AiFillPhone className={cx("icon")} />
                  Phone Number: {customerInfor.phone_number}
                </div>
                <div>
                  <MdAirlineSeatReclineExtra className={cx("icon")} />
                  Amount Seat: {customerInfor.amount_customer}
                </div>
                <div>
                  <IoLocationOutline className={cx("icon")} />
                  Address Start: {customerInfor.address_start}
                </div>
                <div>
                  <IoLocationOutline className={cx("icon")} />
                  Address Stop : {customerInfor.address_stop}
                </div>
                <div>Total: {customerInfor.total} vnd</div>
                <RenderButtonPickUp
                  id_customer={customerInfor.id_customer}
                  index={index}
                  drirection={drirection}
                />
              </div>
            );
          }
        })}
      </>
    );
  }
  const RenderStatusDriving = ({ className, status }) => {
    if (status === 0) {
      return <div className={className}>Waiting for active driving</div>;
    }
    if (status === 1) {
      return <div className={className}>Driving</div>;
    }
    if (status === 2) {
      return <div className={className}>Complete Trip</div>;
    }
  };

  function handlePickup(props) {
    const index = props.target.getAttribute("index");
    const drirection = props.target.getAttribute("drirection");
    if (drirection === "start") {
      const setCustomer = {
        ...dataHandleTrip.list_customer[index],
        pickup: true,
      };
      let newlist = [...dataHandleTrip.list_customer];
      newlist.splice(index, 1, setCustomer);

      setDataHandleTrip((dataHandleTrip) => ({
        ...dataHandleTrip,
        list_customer: [...newlist],
      }));
    }
    if (drirection === "stop") {
      const setCustomer = {
        ...dataHandleTrip.list_customer[index],
        dropoff: true,
      };
      let newlist = [...dataHandleTrip.list_customer];
      newlist.splice(index, 1, setCustomer);

      setDataHandleTrip((dataHandleTrip) => ({
        ...dataHandleTrip,
        list_customer: [...newlist],
      }));
    }
    setOpendetailsModal({ ...opendetailsModal, status: false });
    if (drirection === "start") {
      const indexof = listorder.start.findIndex((value) => {
        return value.id == dataHandleTrip.list_customer[index].id_customer;
      });
      const setStatus = {
        ...listorder.start[indexof],
        status: true,
      };
      let newlist = [...listorder.start];
      newlist.splice(indexof, 1, setStatus);

      setListorder((listorder) => ({
        stop: [...listorder.stop],
        start: [...newlist],
      }));
    }
    if (drirection === "stop") {
      const indexof = listorder.stop.findIndex((value) => {
        return value.id == dataHandleTrip.list_customer[index].id_customer;
      });

      const setStatus = {
        ...listorder.stop[indexof],
        status: true,
      };
      let newlist = [...listorder.stop];
      newlist.splice(indexof, 1, setStatus);

      setListorder((listorder) => ({
        start: [...listorder.start],
        stop: [...newlist],
      }));
    }
  }
  function RenderButtonPickUp(props) {
    if (props.drirection === "start") {
      if (
        dataHandleTrip.status_driver == 1 &&
        dataHandleTrip.list_customer[props.index].pickup == false
      ) {
        return (
          <button
            className={cx("button")}
            id_customer={props.id_customer}
            index={props.index}
            drirection={props.drirection}
            onClick={handlePickup}
          >
            Pick up
          </button>
        );
      } else {
        return (
          <Button className={cx("button")} disabled>
            Pick up
          </Button>
        );
      }
    }
    if (props.drirection === "stop") {
      if (
        dataHandleTrip.status_driver == 1 &&
        dataHandleTrip.list_customer[props.index].dropoff == false
      ) {
        return (
          <button
            className={cx("button")}
            id_customer={props.id_customer}
            index={props.index}
            drirection={props.drirection}
            onClick={handlePickup}
          >
            Drop off
          </button>
        );
      } else {
        return (
          <Button className={cx("button")} disabled>
            Drop off
          </Button>
        );
      }
    }
  }
  function HandlesetTimeStop() {
    if (
      dataHandleTrip.status_driver === 0 ||
      dataHandleTrip.status_driver === 1
    ) {
      return <div className={cx("red-status")}> Waiting to complete </div>;
    }
    if (dataHandleTrip.status_driver === 2) {
      return (
        <div>
          {dataHandleTrip.time_stop ? dataHandleTrip.time_stop : "Errorr"}
        </div>
      );
    }
  }
  async function completeDriving() {
    setDataHandleTrip((dataHandleTrip) => ({
      ...dataHandleTrip,
      time_stop: moment().format("DD-MM-YYYY  hh:mm"),
    }));
    setDataHandleTrip((dataHandleTrip) => ({
      ...dataHandleTrip,
      status_driver: 3,
    }));

    let payload = {
      driver_id: user.userId,
    };

    await axios
      .post("http://localhost:5000/api/booking/completeTrip/", payload)
      .catch((error) => {
        console.log(error.message);
      });
  }

  function RenderDriverInfor() {
    return (
      <div className={cx("wrapper-info-driver")}>
        <Row>
          <Col span={12}>
            <div>
              <FaCalendar className={cx("icon")} />
              Time Start :{" "}
              {moment(dataHandleTrip.time_start).format("DD-MM-YYYY  hh:mm")}
            </div>
            <div>
              <Row>
                <FaCalendar className={cx("icon")} />
                Time Stop : <HandlesetTimeStop />
              </Row>
            </div>
            <Row span={12}>
              <div>Status :</div>
              <RenderStatusDriving
                className={cx("red-status")}
                status={dataHandleTrip.status_driver}
              />
            </Row>
          </Col>
          <Col>
            <ButtonActiveDrive />
          </Col>
        </Row>

        <Modal
          title="Confirm of Drive"
          visible={visible}
          onCancel={hideModalActive}
          okText="Confirm"
          cancelText="Exit"
          footer={null}
        >
          <p>Are you sure you want to start driving? </p>
          <button className={cx("button")} onClick={hideModalActivevsACtive}>
            Confirm
          </button>
        </Modal>
      </div>
    );
  }
  function CheckedPickup() {
    return dataHandleTrip.list_customer.every((list_customer) => {
      return list_customer.pickup == true && list_customer.dropoff == true;
    });
  }
  function ButtonActiveDrive() {
    if (dataHandleTrip.status_driver === 0) {
      return (
        <>
          <button className={cx("button")} onClick={showModalActive}>
            Active Now
          </button>
        </>
      );
    }
    if (dataHandleTrip.status_driver === 1) {
      if (CheckedPickup() === true) {
        return (
          <>
            <button className={cx("button")} onClick={completeDriving}>
              Complete Driving
            </button>
          </>
        );
      }
      if (CheckedPickup() === false) {
        return (
          <>
            <Button className={cx("button")} disabled>
              Complete Driving
            </Button>
          </>
        );
      }
    }
    if (dataHandleTrip.status_driver === 2) {
      return <></>;
    }
  }
  const CheckRender = () => {
    const checked = moment(dataHandleTrip.time_start).diff(moment(), "hours");
    if (checked <= 100 && checked >= 0) {
      return true;
    } else {
      return false;
    }
  };

  // function getPlaceShort(params) {
  //   let element = "";
  //   let arraycut = "";
  //   const result = params.lastIndexOf(",");
  //   arraycut = params.slice(result + 1, params.length);
  //   for (let index = 0; index < arraycut.length; index++) {
  //     if (
  //       arraycut[index] == arraycut[index].toUpperCase() &&
  //       arraycut[index] != " "
  //     ) {
  //       element = element + arraycut[index];
  //     }
  //   }
  //   return element;
  // }

  function ButtonDetailNodePlacec({ id, drirection }) {
    return (
      <button
        className={cx("button-details")}
        onClick={DetailsCustomer}
        idwithlist={id}
        drirection={drirection}
      >
        more
      </button>
    );
  }
  function DetailsCustomer(event) {
    setOpendetailsModal({
      id: event.target.getAttribute("idwithlist"),
      drirection: event.target.getAttribute("drirection"),
      status: true,
    });
  }
  function NodePlace({ index, id, place, distance, status, drirection }) {
    return (
      <div className={cx("wrapper-loca")} key={id}>
        <StatusNodePlace status={status} />
        <div className={cx("wrapper-content-node")}>
          <div> {place}</div>
          <div className={cx("distance-node")}>
            {(distance / 1000).toFixed(2)}km
          </div>
        </div>
        <ButtonDetailNodePlacec id={id} drirection={drirection} index={index} />
      </div>
    );
  }
  function StatusNodePlace({ status }) {
    if (status == true) {
      return (
        <div className={cx("wrapper-icon-loca")}>
          <div className={cx("dot-node")}></div>
          <div className={cx("dot-node")}></div>

          <div className={cx("dot-node")}></div>
          <AiOutlineCheckCircle className={cx("icon-loca")} />
        </div>
      );
    }
    if (status == false) {
      return (
        <div className={cx("wrapper-icon-loca")}>
          <div className={cx("dot-node")}></div>
          <div className={cx("dot-node")}></div>

          <div className={cx("dot-node")}></div>
          <BsCircle className={cx("icon-loca")} />
        </div>
      );
    }
  }
  function ModalDetailsCustomer() {
    return (
      <Modal
        footer={null}
        title="Details Customer"
        visible={opendetailsModal.status}
        onCancel={hideModalPickup}
      >
        {RenderListCustomer({
          id: opendetailsModal.id,
          drirection: opendetailsModal.drirection,
        })}
      </Modal>
    );
  }
  function FlowDriver({ drirection }) {
    if (listorder) {
      let newlist = [];
      if (drirection === "start") {
        newlist = [...listorder.start];
      }
      if (drirection === "stop") {
        newlist = [...listorder.stop];
      }
      return newlist
        .sort((a, b) => {
          return a.distance - b.distance;
        })
        .map((item, index) => {
          return (
            <>
              <NodePlace
                index={index}
                status={item.status}
                drirection={drirection}
                id={item.id}
                place={item.place}
                distance={item.distance}
              />
            </>
          );
        });
    }
  }
  function FlowDriverwithLocation() {
    if (dataHandleTrip.status_driver === 1) {
      return (
        <div>
          <h2 className={cx("title-flow")}>
            <GrMapLocation /> Recommen flow driver :
          </h2>
          <div className={cx("wrapper-location")}>
            <IoLocationOutline className={cx("icon-location")} />{" "}
            <div> {locationPlace}</div>
          </div>

          <FlowDriver drirection={"start"} />
          <FlowDriver drirection={"stop"} />
          <ModalDetailsCustomer />
        </div>
      );
    }
  }
  return (
    <div
      style={{
        display: CheckRender() ? "block" : "none",
        width: "100%",
        paddingTop: "40px",
        paddingBottom: "100px",
      }}
    >
      <div>
        <div
          className={cx("wrapper-content")}
          style={{ display: active ? "block" : "none" }}
        >
          <Row>
            <Col>
              <h2>Hello driving : </h2>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <RenderDriverInfor />
            </Col>
          </Row>
        </div>
        <FlowDriverwithLocation />
      </div>
    </div>
  );
}

export default HandleTripDriver;
