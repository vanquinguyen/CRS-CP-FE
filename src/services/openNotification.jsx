import { notification } from "antd";

export const openNotification = (type, message, desc) => {
  notification[type]({
    message: message,
    description: desc,
  });
};
