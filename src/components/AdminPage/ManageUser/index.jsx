import { Button, Form, Input, Popconfirm, Table, Tag } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const ManageUser = () => {
  const [dataSource, setDataSource] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const getAllUser = async () => {
      const payload = {
        role: "user",
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
      const userData = res.data.map((item) => {
        return {
          key: item._id,
          name: item.name,
          id: item._id,
          phone: item.phoneNumber,
          isActive: !item.lockFlag,
        };
      });
      setDataSource(userData);
    };
    getAllUser();
  }, []);

  const apiBlock = async (id, status) => {
    const payload = {
      id: id,
      lockFlag: status,
    };

    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer " + user.accessToken,
    };

    const res = await axios.post(
      "http://localhost:5000/api/users/status/",
      payload,
      {
        headers: headers,
      }
    );
    console.log(res);
  };

  const handleBlock = (key) => {
    const newData = dataSource.map((item) =>
      item.key === key ? { ...item, isActive: false } : item
    );
    apiBlock(key, true);
    setDataSource(newData);
  };
  const handleActive = (key) => {
    const newData = dataSource.map((item) =>
      item.key === key ? { ...item, isActive: true } : item
    );
    apiBlock(key, false);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "100px",
      render: (id) => (
        <div
          title={id}
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            width: "100px",
          }}
        >
          {id}
        </div>
      ),
    },
    {
      title: "Full name",
      dataIndex: "name",
      editable: true,
    },

    {
      title: "Phone number",
      dataIndex: "phone",
    },

    {
      title: "Status",
      dataIndex: "isActive",
      render: (tag) => (
        <Tag color={tag === true ? "green" : "volcano"}>
          {tag === true ? "Active" : "Block"}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          record.isActive ? (
            <Popconfirm
              title="Sure to block?"
              onConfirm={() => {
                handleBlock(record.key);
              }}
            >
              <a>Block</a>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Sure to active?"
              onConfirm={() => {
                handleActive(record.key);
              }}
            >
              <a>Active</a>
            </Popconfirm>
          )
        ) : null,
    },
  ];

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div style={{ width: "100%" }}>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default ManageUser;
