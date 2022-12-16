import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import CoutDownwithActive from "./CoutDownwithActive";
import getListOrder from "./getListOrder";
import axios from "axios";
import { KEY_API_MAP_GG, STATUS_TICKET } from "../../constants";
import RenderUI from "./RenderUI";
import styles from "./DetaillingTrip.module.scss";
import { Col, Row, Skeleton, Spin } from "antd";
import { GrMoney } from "react-icons/gr";
import {
  MdOutlineAirlineSeatReclineNormal,
  MdShareLocation,
} from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";

// status  = 2 driving .//  status = 0 waiting for confirm // . status =-1 . fail . // status = 1 waiting for driving // status = 3 success  ///
// 4 Waiting for report responsive
const DATA = {
  id: 1,
  name_driver: "Do Thanh Tu",
  total_seat: 4,
  total_cost: "2.000.000",
  status_driver: 2,
  time_stop: "",
  address_start: "Eapok Garden, Cư Suê, Cư M'gar District, Dak Lak , Viet Nam",
  time_start: "2022-09-17T21:24",
  address_stop: "123 Lý Văn Phức , Hòa Hải , Ngũ Hành Sơn , Đà Nẵng",
  list_customer: [
    {
      id_customer: "c2",
      name_customer: "Ngoc Trinh ",
      amount_customer: 2,
      phone_number: "0123123123",
      address_start: "Cư Suê, Cư M'gar District, Dak Lak, Viet Nam",
      address_stop:
        "Đường số 385, Tăng Nhơn Phú A, Quận 9, Ho Chi Minh City ,Viet Nam ",
      loca_long: "123",
      loca_lat: "123",
      pickup: false,
      dropoff: false,
      total: "1.500.000",
    },
    {
      id_customer: "c4",
      name_customer: "Ngoc Trinh ",
      amount_customer: 2,
      phone_number: "0123123123",
      address_start: "Gia Lai , Vietnam",
      address_stop: "Đà Lạt ,Viet Nam",

      loca_long: "123",
      loca_lat: "123",
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
      address_start: "Buon Ma Thuot, Dak Lak,Viet Nam",
      address_stop: "Đăk Nông ,Viet Nam",
      loca_long: "123",
      loca_lat: "123",
      pickup: false,
      dropoff: false,
      total: "1.500.000",
    },
  ],
  list_order: [],
};
const cx = classNames.bind(styles);

function DetailingTrip({data1}) {
  const [data, setData] = useState(data1);
  const [position, setPostion] = useState();

  useEffect(() => {
    const getloca = () => {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          var locationMarker = null;
          if (locationMarker) {
            // return if there is a locationMarker bug
            return;
          }

          // sets default position to your position
          var lat = position.coords["latitude"];
          var long = position.coords["longitude"];

          var config = {
            method: "get",
            url: `https://secure-fortress-29312.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDvv-ZvZZ0lRK-QlkG5w0XG8dCxHKgIoa8`,
            headers: {},
          };
          const dataRes = await axios(config).then((item) => item);

          setPostion({
            lnglat: {
              long: long,
              lat: lat,
            },
            address: dataRes.data.results[0].formatted_address,
          });
        },
        function (error) {
          console.log("Error: ", error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    };

    getloca();
  }, []);
  const setStatus = () => {
    setData((data) => {
      return {
        ...data,
        status_driver: STATUS_TICKET.DRIVING,
      };
    });
  };
  useEffect(() => {
    const getList = async () => {
      const listOrder = await getListOrder(data, position);
      if (listOrder && listOrder.length > 0) {
        return setData((data) => {
          return { ...data, list_order: listOrder };
        });
      }
    };
    getList();
  }, [position]);
  const partminutes = (time) => {
    let hours = 0;
    let minutes;
    if (time.includes("hours") || time.includes("hour")) {
      hours = parseInt(time.slice(0, time.indexOf("hour")));
    }
    minutes = parseInt(
      time.slice(
        time.includes("hour") ? time.indexOf("hour") + 5 : 0,
        time.indexOf("mins")
      )
    );
    return hours * 60 + minutes;
  };
  const parsehours = (data) => {
    const time = data.list_order.reduce((total, item) => {
      return total + partminutes(item.duration);
    }, 0);
    console.log(time);
    if (time <= 60) {
      return time + " mins";
    }
    if (time > 60) {
      const hours = Math.ceil(time / 60);
      const minutes = time % 60;
      return hours + " hours " + minutes + " mins ";
    }
  };
  return (
    <div>
      {position && data?.list_customer ? (
        <div className={cx("wrapper")}>
          <div className={cx("wrapper-top-detail")}>
            <h1 className={cx("title")}>Recommend ride plan</h1>
            <CoutDownwithActive
              status={data.status_driver}
              setStatus={setStatus}
              timeStart={data.time_start}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className={cx("title-summary")}>Summary trip</h1>

            <div className={cx("wrapper-total-content")}>
              <div className={cx("item-summary")}>
                <MdShareLocation className={cx("icon-summary")} />
                total duration :
                {data.list_order.length > 0
                  ? data.list_order.reduce((total, item) => {
                      return total + parseInt(item.distance.replace("km", ""));
                    }, 0)
                  : "waiting"}{" "}
                km
              </div>
              <div className={cx("item-summary")}>
                <BsClockHistory className={cx("icon-summary")} />
                total time :{" "}
                {data.list_order.length > 0
                  ? (
                      data.list_order.reduce((total, item) => {
                        return total + item.value_duration;
                      }, 0) /
                      60 /
                      60
                    ).toFixed(1) + " hours"
                  : "waiting"}
              </div>
              <div className={cx("item-summary")}>
                <MdOutlineAirlineSeatReclineNormal
                  className={cx("icon-summary")}
                />
                total seat : {data.total_seat}
              </div>
              <div className={cx("item-summary")}>
                <GrMoney className={cx("icon-summary")} />
                total cost : {data.total_cost}
              </div>
            </div>
          </div>
          <RenderUI position={position} data={data} />
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          <Skeleton />
        </div>
      )}
    </div>
  );
}

export default DetailingTrip;
