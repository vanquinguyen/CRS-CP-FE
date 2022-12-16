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
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./RequestDriver.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);
const { Option } = Select;
// status_active ===0 waiting for active /// == 1 succes // -1 falid

function RequestDriver() {
  const [dataSource, setDataSource] = useState([]);
  const [visiModalInfoDriver, setVisiModalInfoDriver] = useState(false);
  const [visiModalInfoCar, setVisiModalInfoCar] = useState(false);
  const [detailDriver, setDetailDriver] = useState({});
  const [filter, setFilter] = useState("All");
  let user = JSON.parse(localStorage.getItem("user"));
  const handleActive = async (id, status) => {
    const newarr = dataSource.filter((item) => item.id !== id);
    const driverinfo = dataSource.filter((item) => item.id === id);
    newarr.push({ ...driverinfo[0], status_active: status });
    setDataSource(newarr);
    const payload = {
      userId: id,
    };
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer " + user.accessToken,
    };
    if (status === "success") {
      const res = await axios.post(
        "http://localhost:5000/api/users/activeDriver/",
        payload,
        {
          headers: headers,
        }
      );
      console.log(res);
    }
    if (status === "fail") {
      const res = await axios.post(
        "http://localhost:5000/api/users/diableDriver/",
        payload,
        {
          headers: headers,
        }
      );
      console.log(res);
    }
  };

  const handleChangeFilter = (value) => {
    setFilter(value);
  };
  const handleFilter = () => {
    if (filter === "Success") {
      return dataSource.filter((item) => item.status_active === "success");
    }
    if (filter === "All") {
      return dataSource.filter((item) => item);
    }
    if (filter === "Waiting") {
      return dataSource.filter((item) => item.status_active === "waiting");
    }
    if (filter === "Fail") {
      return dataSource.filter((item) => item.status_active === "fail");
    }
  };
  const renderAction = (id) => {
    const driveritem = dataSource.filter((item) => item.id === id);
    if (driveritem[0].status_active === "waiting") {
      return false;
    }
    return true;
  };
  const closeModal = () => {
    setVisiModalInfoDriver(false);
    setVisiModalInfoCar(false);
  };
  const ModalShowInfoDriver = () => {
    return (
      <Modal
        title="Information driver"
        visible={visiModalInfoDriver}
        footer={null}
        onCancel={closeModal}
        width={700}
      >
        <Image.PreviewGroup>
          <Image width={215} src={detailDriver.img_portrait} />
          <Image width={215} src={detailDriver.img_citizen_id} />
          <Image width={215} src={detailDriver.img_license} />
        </Image.PreviewGroup>
        <Button
          style={{
            marginTop: "20px",
          }}
          type="primary"
          onClick={closeModal}
        >
          Close
        </Button>
      </Modal>
    );
  };

  const ModalShowInfoCar = () => {
    return (
      <Modal
        title="Information car"
        visible={visiModalInfoCar}
        footer={null}
        onCancel={closeModal}
        width={700}
      >
        <Image.PreviewGroup>
          <Image width={215} src={detailDriver.img_registration_car} />
          <Image width={215} src={detailDriver.img_registry_car} />
          <Image width={215} src={detailDriver.img_vehicle} />
        </Image.PreviewGroup>
        <Button
          style={{
            marginTop: "20px",
          }}
          type="primary"
          onClick={closeModal}
        >
          Close
        </Button>
      </Modal>
    );
  };
  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      title: "ID car",
      dataIndex: "id_car",
      key: "id_car",
    },

    {
      title: "Type car",
      dataIndex: "type_car",
      key: "type_car",
    },
    {
      title: "Information Driver",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <a
          onClick={() => {
            showinfordriver(id);
          }}
        >
          Detail
        </a>
      ),
    },
    {
      title: "Information Car",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <a
          onClick={() => {
            showinforcar(id);
          }}
        >
          Detail
        </a>
      ),
    },
    {
      title: "Status",
      key: "id",
      dataIndex: "status_active",
      render: (tag) => (
        <Tag
          color={
            tag === "success" ? "green" : tag === "fail" ? "volcano" : "yellow"
          }
        >
          {tag === "success" ? "Success" : tag === "fail" ? "Fail" : "Waiting"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <Popconfirm
          title="Sure to confirm?"
          onConfirm={() => {
            handleActive(id, "success");
          }}
          disabled={renderAction(id)}
        >
          <a
            style={{ color: renderAction(id) === true ? "#beb5b5" : "#1890ff" }}
          >
            Active
          </a>
        </Popconfirm>
      ),
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <Popconfirm
          title="Sure to confirm?"
          onConfirm={() => {
            handleActive(id, "fail");
          }}
          disabled={renderAction(id)}
        >
          <a
            style={{ color: renderAction(id) === true ? "#beb5b5" : "#1890ff" }}
          >
            Diable
          </a>
        </Popconfirm>
      ),
    },
  ];
  const showinfordriver = (id) => {
    setVisiModalInfoDriver(true);
    setDetailDriver(dataSource.filter((item) => item.id === id)[0]);
  };
  const showinforcar = (id) => {
    setVisiModalInfoCar(true);
    setDetailDriver(dataSource.filter((item) => item.id === id)[0]);
  };

  useEffect(() => {
    const getAllDriver = async () => {
      const payload = {
        role: "driver",
      };

      const headers = {
        "Content-Type": "application/json",
        authorization: "Bearer " + user.accessToken,
      };

      const res = await axios.post(
        "http://localhost:5000/api/users/getUserList/",
        payload,
        {
          headers: headers,
        }
      );
      const driverData = res.data.map((item) => {
        return {
          id: item._id,
          name: item.name,
          email: item.email,
          phonenumber: item.phoneNumber,
          status_active: item.isAccept,
          type_car: 7,
          id_car: item.car_id,
          img_portrait: item.personalPortrait,
          img_citizen_id: item.citizenID,
          img_license: item.license,
          img_vehicle: item.photoVehicle,
          img_registration_car: item.vehicleRegistration,
          img_registry_car: item.registryVehicle,
        };
      });
      setDataSource(driverData);
    };
    getAllDriver();
  }, []);

  return (
    <div>
      <Row
        style={{
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <div style={{ marginTop: "15px", marginRight: "20px" }}>
          Filter request driver :
        </div>
        <Select
          defaultValue={filter}
          style={{
            width: 120,
          }}
          size={"large"}
          onChange={handleChangeFilter}
        >
          <Option value="All">All</Option>
          <Option value="Waiting">Waiting</Option>
          <Option value="Success">Succes</Option>
          <Option value="Fail">Fail</Option>
        </Select>
      </Row>
      <Table columns={columns} dataSource={handleFilter()} />
      <ModalShowInfoDriver />
      <ModalShowInfoCar />
    </div>
  );
}

export default RequestDriver;
