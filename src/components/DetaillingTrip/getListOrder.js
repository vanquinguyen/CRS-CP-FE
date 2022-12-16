import axios from "axios";
import React, { useEffect, useState } from "react";
import { KEY_API_MAP_GG } from "../../constants";

// const DATA = {
//   id: 1,
//   role: "driver",
//   status_driver: 1,
//   time_stop: "",
//   address_start: "123 Lý Văn Phức , Hòa Hải , Ngũ Hành Sơn , Đà Nẵng",
//   time_start: "2022-09-12T20:49",
//   address_stop: "123 Lý Văn Phức , Hòa Hải , Ngũ Hành Sơn , Đà Nẵng",
//   list_customer: [
//     {
//       id_customer: "c2",
//       name_customer: "Ngoc Trinh ",
//       amount_customer: 2,
//       phone_number: "0123123123",
//       address_start: "MyAn,NguHanhSon,DaNang,VietNam",
//       address_stop: "  Bùi Điền, Hương Xuân, Hương Trà, Thừa Thiên Huế ",
//       loca_long: "123",
//       loca_lat: "123",
//       pickup: false,
//       dropoff: false,
//       total: "1.500.000",
//     },
//     {
//       id_customer: "c4",
//       name_customer: "Ngoc Trinh ",
//       amount_customer: 2,
//       phone_number: "0123123123",
//       address_start: "HoaKhanh,DaNang,VietNam",
//       address_stop: "  Bùi Điền, Hương Xuân, Hương Trà, Thừa Thiên Huế ",
//       loca_long: "123",
//       loca_lat: "123",
//       pickup: false,
//       dropoff: false,
//       total: "1.500.000",
//     },
//     {
//       id_customer: "c1",
//       avatar_customer:
//         "https://images.pexels.com/photos/2625122/pexels-photo-2625122.jpeg?cs=srgb&dl=pexels-ali-pazani-2625122.jpg&fm=jpg",
//       name_customer: "Ngoc Trinh ",
//       amount_customer: 2,
//       phone_number: "0123123123",
//       address_start: "HaiChau,DaNang,VietNam",
//       address_stop: "Lý Thần Tông, Hương Chữ, Hương Trà, Thừa Thiên Huế",
//       loca_long: "123",
//       loca_lat: "123",
//       pickup: false,
//       dropoff: false,
//       total: "1.500.000",
//     },
//   ],
//   list_order: [],
// };

async function getListOrder(DATA, loca) {
  if (DATA && loca) {
    const listPlaceStart = DATA.list_customer.map((item) => {
      return {
        id: item.id_customer,
        place: item.address_start,
        type: "start",
        status: item.pickup,
      };
    });
    const listPlaceStop = DATA.list_customer.map((item) => {
      return {
        id: item.id_customer,
        place: item.address_stop,
        type: "stop",
        status: item.dropoff,
      };
    });
    const newListPlaceStop = listPlaceStop.filter((item) => {
      return item.id !== DATA.list_customer[0].id_customer;
    });
    const fullListPlace = [...listPlaceStart, ...newListPlaceStop];
    const listPlaceCallApi = await getWaypointOder(
      parStringPlace(fullListPlace),
      loca.address,
      DATA.list_customer[0].address_stop
    );
    const listUpdateData = listPlaceCallApi.data.routes[0].waypoint_order.map(
      (order) => {
        return fullListPlace[order];
      }
    );
    listUpdateData.push({
      id: DATA.list_customer[0].id_customer,
      place: DATA.list_customer[0].address_stop,
      type: "stop",
      status: DATA.list_customer[0].pickup,
    });
    return listPlaceCallApi.data.routes[0].legs.map((item, index) => {
      return {
        id: listUpdateData[index].id,
        place: listUpdateData[index].place,
        type: listUpdateData[index].type,
        distance: item.distance.text,
        duration: item.duration.text,
        value_duration: item.duration.value,
        status: listUpdateData[index].status,
        isReport: false,
      };
    });
  }
}

const parStringPlace = (list) => {
  let listParse = "";
  list.forEach((element) => {
    listParse = listParse + "|" + element.place;
  });
  return listParse;
};

const getWaypointOder = async (listPlace, start, stop) => {
  var config = {
    method: "get",
    url: `https://secure-fortress-29312.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${stop}&waypoints=optimize:true${listPlace}&key=${KEY_API_MAP_GG}`,
    headers: {},
  };
  const dataRes = await axios(config).then((item) => item);
  return dataRes;
};

export default getListOrder;
