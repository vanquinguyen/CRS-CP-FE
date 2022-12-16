import classNames from "classnames/bind";
import { Row, Col, Progress, Input, Checkbox } from "antd";
import { useState, useEffect } from "react";

import {
  AreaChart,
  linearGradient,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import styles from "./ReportDriver.module.scss";
import moment from "moment";
const data = [
  { day_of_month: "01", this_month: 1097, last_moth: 1129 },
  { day_of_month: "02", this_month: 1066, last_moth: 1002 },
  { day_of_month: "03", this_month: 1235, last_moth: 1241 },
  { day_of_month: "04", this_month: 1163, last_moth: 1118 },
  { day_of_month: "05", this_month: 1005, last_moth: 1107 },
  { day_of_month: "06", this_month: 1287, last_moth: 1000 },
  { day_of_month: "07", this_month: 1027, last_moth: 1280 },
  { day_of_month: "08", this_month: 1205, last_moth: 1086 },
  { day_of_month: "09", this_month: 1082, last_moth: 1265 },
  { day_of_month: "10", this_month: 1267, last_moth: 1085 },
  { day_of_month: "11", this_month: 1188, last_moth: 1180 },
  { day_of_month: "12", this_month: 1191, last_moth: 1218 },
  { day_of_month: "13", this_month: 1252, last_moth: 1135 },
  { day_of_month: "14", this_month: 1230, last_moth: 1121 },
  { day_of_month: "15", this_month: 1152, last_moth: 1096 },
  { day_of_month: "16", this_month: 1106, last_moth: 1253 },
  { day_of_month: "17", this_month: 1168, last_moth: 1163 },
  { day_of_month: "18", this_month: 1006, last_moth: 1228 },
  { day_of_month: "19", this_month: 1053, last_moth: 1119 },
  { day_of_month: "20", this_month: 1104, last_moth: 1029 },
  { day_of_month: "21", this_month: 1261, last_moth: 1177 },
  { day_of_month: "22", this_month: 1271, last_moth: 1260 },
  { day_of_month: "23", this_month: 0, last_moth: 1013 },
  { day_of_month: "24", this_month: 0, last_moth: 1001 },
  { day_of_month: "25", this_month: 0, last_moth: 1204 },
  { day_of_month: "26", this_month: 0, last_moth: 1169 },
  { day_of_month: "27", this_month: 0, last_moth: 1023 },
  { day_of_month: "28", this_month: 0, last_moth: 1078 },
  { day_of_month: "29", this_month: 0, last_moth: 1478 },
  { day_of_month: "30", this_month: 0, last_moth: 1478 },
  { day_of_month: "31", this_month: 0, last_moth: 1478 },
];

const cx = classNames.bind(styles);
function ReportDriver() {
  const [dailyicome, setDailyincome] = useState();
  const [monthicome, setMonthicome] = useState();
  const [checked, setChecked] = useState(false);
  const handleInputDaily = (e) => {
    if (e.target.value) {
      setDailyincome(((totalDaily() / e.target.value) * 100).toFixed(0));
    }
  };
  const totalDaily = () => {
    let today = moment().format("DD").toString();
    return data.find((item) => {
      return item.day_of_month == today;
    }).this_month;
  };
  const totalMoth = () => {
    let totalmonth = 0;
    data.map((item) => {
      if (item.this_month) {
        totalmonth += item.this_month;
      }
    });
    return totalmonth;
  };
  const handleInputMonthIn = (e) => {
    if (e.target.value) {
      setMonthicome(((totalMoth() / e.target.value) * 100).toFixed(0));
    }
  };
  const checkRender = (e) => {
    setChecked(e.target.checked);
  };
  function RenderChart(params) {
    if (checked) {
      return (
        <AreaChart
          width={850}
          height={250}
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day_of_month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip style={{ textOverflow: "ellipsis" }} />
          <Area
            style={{ textOverflow: "ellipsis" }}
            type="monotone"
            dataKey="this_month"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            style={{
              textOverflow: "ellipsis",
            }}
            type="monotone"
            dataKey="last_moth"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      );
    } else {
      return (
        <AreaChart
          width={850}
          height={250}
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day_of_month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip style={{ textOverflow: "ellipsis" }} />
          <Area
            style={{ textOverflow: "ellipsis" }}
            type="monotone"
            dataKey="this_month"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      );
    }
  }
  return (
    <div className={cx("wrapper")}>
      <Row>
        <Col offset={1}>
          <h1 className={cx("title")}>Financial Report :</h1>
        </Col>
      </Row>
      <Row>
        <Col offset={1}>
          <p className={cx("text-setgoal")}>
            Set a goal for this month and daily , to get the income you want
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={22} offset={1}>
          <div className="line"> </div>
        </Col>
      </Row>
      <Row>
        <Col offset={1} span={8}>
          <div className={cx("wrapper-income")}>
            <Progress type="circle" percent={dailyicome} width={150} />
            <Input
              className={cx("inputag")}
              onBlur={handleInputDaily}
              addonBefore="Daily income"
              addonAfter=".000 VND"
            />
            <div>
              Your daily income:{" "}
              <span style={{ fontSize: "1.5rem", color: "red" }}>
                {totalDaily() + ".000 VND"}
              </span>
            </div>
          </div>
        </Col>
        <Col offset={2} span={8}>
          <div className={cx("wrapper-income")}>
            <Progress type="circle" percent={monthicome} width={150} />
            <Input
              className={cx("inputag")}
              onBlur={handleInputMonthIn}
              addonBefore="Month income"
              addonAfter=".000 VND"
            />
            <div>
              Your monthly income:{" "}
              <span style={{ fontSize: "1.5rem", color: "red" }}>
                {totalMoth() + ".000 VND"}
              </span>
            </div>
          </div>
        </Col>
      </Row>

      <div>
        <Row>
          <Col offset={1} span={22}>
            <h1 className={cx("title") + " " + cx("custom-title")}>
              Revenue Chart :{" "}
            </h1>
            <RenderChart />
            <p className={cx("note-text")}>Note :</p>
            <Row>
              <Col offset={1}>
                <div>
                  <Checkbox onChange={checkRender} className={cx("checkbox")} />
                  Comper revenue last month
                </div>
              </Col>
              <Col offset={8}>
                <div className={cx("note")}>
                  <div className={cx("box-this-month")}></div>
                  Revenue of this month
                </div>
                <div
                  style={{ display: checked ? "" : "none" }}
                  className={cx("note")}
                >
                  <div className={cx("box-last-month")}></div>
                  Revenue of last month
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ReportDriver;
