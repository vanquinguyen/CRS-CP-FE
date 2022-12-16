import {
  Button,
  Image,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Notification.module.scss";
import moment from "moment";

const cx = classNames.bind(styles);
const { Option } = Select;
// status_active ===0 waiting for active /// == 1 succes // -1 falid
const data = [
  {
    id: "1jwekhjrwie r-e rwer",
    name_sender_report: "Hoang Anh ",
    name_report: "Do Tu",
    id_route: "123123123",
    content: "Driver don't come take me",
    createdAt: "2014-12-12T09:30:00.0000000Z",
    status_accept: false,
  },
];

function Notification() {
  const [dataSource, setDataSource] = useState(data);

  const renderAction = (id) => {
    const driveritem = dataSource.filter((item) => item.id === id);
    if (driveritem[0].status_accept === false) {
      return false;
    }
    return true;
  };

  const handleActive = (id, status) => {
    const newarr = dataSource.filter((item) => item.id !== id);
    const driverinfo = dataSource.filter((item) => item.id === id);
    newarr.push({ ...driverinfo[0], status_accept: status });
    setDataSource(newarr);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name sender",
      dataIndex: "name_sender_report",
    },
    {
      title: "Accused person",
      dataIndex: "name_report",
    },
    {
      title: "ID route",
      dataIndex: "id_route",
    },

    {
      title: "Time",
      dataIndex: "createdAt",

      render: (time) => {
        return <div>{moment.utc(time).format("HH:mm DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Content",
      dataIndex: "content",
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <Popconfirm
          title="Sure to confirm?"
          onConfirm={() => {
            handleActive(id, true);
          }}
          disabled={renderAction(id)}
        >
          <a
            style={{ color: renderAction(id) === true ? "#beb5b5" : "#1890ff" }}
          >
            {renderAction(id) ? "Accepted" : "Accept"}
          </a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default Notification;
