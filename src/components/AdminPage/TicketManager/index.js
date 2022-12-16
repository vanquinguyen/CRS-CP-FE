import React from "react";
import "./index.scss";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Menu, Space, Table } from "antd";
import moment from "moment";

// status  = 2 driving .//  status = 0 waiting for confirm // . status =-1 . fail . // status = 1 waiting for driving // status = 3 success  ///
// 4 Waiting for report responsive

const dataSource = [
  {
    id_ticket: 1,
    place_start: "Huế",
    place_stop: "Quảng Nam",
    time_start: "2013-03-07T17:00:00",
    time_stop: "2013-03-07T07:00:00",
    total_seat: 6,
    total_cost: "300.000",
    status_ticket: 1,
    name_driver: "Sơn Tùng ",
    list_customer: [
      {
        id_customer: 1,
        name_customer: "Ha ha ha",
        place_start: "12 Đại Lộ 3 , P. Phú Nhuận , Q9 , Hồ Chí Minh",
        place_stop: "59 lý văn phức , hòa hải , ngũ hành sơn , Đà Nẵng",
        list_seat: ["ah1", "ah2", "ah2", "ah2"],
        total_cost: "100.000",
        pickup: true,
        dropoff: false,
      },
      {
        id_customer: 2,
        name_customer: "Ha ha ha",
        place_start: "12 Đại Lộ 3 , P. Phú Nhuận , Q9 , Hồ Chí Minh",
        place_stop: "59 lý văn phức , hòa hải , ngũ hành sơn , Đà Nẵng",
        list_seat: ["ah1", "ah2"],
        total_cost: "100.000",
        pickup: true,
        dropoff: false,
      },
      {
        id_customer: 3,
        name_customer: "Ha ha ha",
        place_start: "12 Đại Lộ 3 , P. Phú Nhuận , Q9 , Hồ Chí Minh",
        place_stop: "59 lý văn phức , hòa hải , ngũ hành sơn , Đà Nẵng",
        list_seat: ["ah1", "ah2"],
        total_cost: "100.000",
        pickup: true,
        dropoff: false,
      },
    ],
  },
  {
    id_ticket: 2,
    place_start: "Hồ Chí Minh",
    place_stop: "Đà Nẵng",
    time_start: "2013-03-07T17:00:00",
    time_stop: "2013-03-07T07:00:00",
    total_seat: 4,
    total_cost: "300.000",
    status_ticket: 1,
    name_driver: "Sơn Tùng MTP",
    list_customer: [
      {
        id_customer: 10,
        name_customer: "Ha ha ha",
        place_start: "12 Đại Lộ 3 , P. Phú Nhuận , Q9 , Hồ Chí Minh",
        place_stop: "59 lý văn phức , hòa hải , ngũ hành sơn , Đà Nẵng",
        list_seat: ["ah1", "ah2"],
        total_cost: "100.000",
        pickup: true,
        dropoff: false,
      },
    ],
  },
];

function TicketManager() {
  const ConverStatus = ({ status }) => {
    return status === -1 ? (
      <span>
        <Badge status="fail" />
        Fail
      </span>
    ) : status === 3 ? (
      <span>
        <Badge status="success" />
        Finished
      </span>
    ) : (
      <span>
        <Badge status="warning" />
        Waiting
      </span>
    );
  };
  const table = (id) => {
    const { index } = id;
    const columns = [
      {
        title: "ID",
        dataIndex: "id_customer",
        key: "id_customer",
      },
      {
        title: "Name",
        dataIndex: "name_customer",
        key: "name_customer",
      },
      {
        title: "List seat",
        dataIndex: "list_seat",
        key: "list_seat",
        render: (list_seat) => <>{list_seat.join(",")}</>,
      },
      {
        title: "Place start",
        dataIndex: "place_start",
        key: "place_start",
      },
      {
        title: "Place stop",
        dataIndex: "place_stop",
        key: "place_stopt",
      },
      {
        title: "Total cost",
        dataIndex: "total_cost",
        key: "total_cost",
      },
      {
        title: "Pick up",
        key: "pickup",
        dataIndex: "pickup",
        render: (bolean) => (
          <>
            {bolean === true ? (
              <span>
                <Badge status="success" />
                Completed
              </span>
            ) : (
              <span>
                <Badge status="warning" />
                Waiting
              </span>
            )}
          </>
        ),
      },
      {
        title: "Drop off",
        key: "dropoff",
        dataIndex: "dropoff",
        render: (bolean) => (
          <>
            {bolean === true ? (
              <span>
                <Badge status="success" />
                Completed
              </span>
            ) : (
              <span>
                <Badge status="warning" />
                Waiting
              </span>
            )}
          </>
        ),
      },
    ];
    const data = dataSource[index].list_customer.map((infor_customer) => {
      return {
        id_customer: infor_customer.id_customer,
        name_customer: infor_customer.name_customer,
        place_start: infor_customer.place_start,
        place_stop: infor_customer.place_stop,
        list_seat: infor_customer.list_seat,
        total_cost: infor_customer.total_cost,
        pickup: infor_customer.pickup,
        dropoff: infor_customer.dropoff,
      };
    });

    return <Table columns={columns} dataSource={data} pagination={true} />;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id_ticket",
      key: "id_ticket",
    },
    {
      title: "Driver name",
      dataIndex: "name_driver",
      key: "name_driver",
    },
    {
      title: "Place Start",
      dataIndex: "place_start",
      key: "place_start",
    },
    {
      title: "Place Stop",
      dataIndex: "place_stop",
      key: "place_stop",
    },
    {
      title: "Time start",
      dataIndex: "time_start",
      key: "time_start",
      render: (time) => <span>{moment(time).format("hh:mm DD/MM/YYYY")}</span>,
    },
    {
      title: "Time stop",
      dataIndex: "time_stop",
      key: "time_stop",
      render: (time) => <span>{moment(time).format("hh:mm DD/MM/YYYY")}</span>,
    },
    {
      title: "Total seat",
      dataIndex: "total_seat",
      key: "total_seat",
    },
    {
      title: "Total cost",
      dataIndex: "total_cost",
      key: "total_cost",
    },
    {
      title: "Status",
      dataIndex: "status_ticket",
      key: "status_ticket",
      render: (status) => <ConverStatus status={status} />,
    },
  ];
  function getDataSource() {
    const arr = dataSource.map((info_ticket, index) => {
      return {
        key: index,
        index: index,
        id_ticket: info_ticket.id_ticket,
        name_driver: info_ticket.name_driver,
        place_start: info_ticket.place_start,
        place_stop: info_ticket.place_stop,
        time_start: info_ticket.time_start,
        time_stop: info_ticket.time_stop,
        total_seat: info_ticket.total_seat,
        total_cost: info_ticket.total_cost,
        status_ticket: info_ticket.status_ticket,
      };
    });
    return arr;
  }
  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (infor_driver) => {
            return table(infor_driver);
          },
        }}
        dataSource={getDataSource()}
      />
    </>
  );
}

export default TicketManager;
