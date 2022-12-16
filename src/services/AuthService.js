// import { ExclamationCircleOutlined } from "@ant-design/icons";
// import { Modal } from "antd";
// import axios from "axios";
// import { API_AUTH } from "constants";
// import { setAuth } from "redux/slices/authSlice";
// import { setToken } from "services/localStorage";

// const loginUser = async (auth, token, dispatch) => {
//   try {
//     const res = await axios({
//       method: "POST",
//       data: auth,
//       url: API_AUTH,
//       params: {
//         token: token,
//       },
//     });
//     if (res) {
//       dispatch(setAuth({ ...res.data.object, isLoading: false }));
//       const token = JSON.stringify(res.headers.authorization).split(`"`)[1];
//       setToken(token);
//     } else {
//       dispatch(
//         setAuth({
//           id: "",
//           name: "",
//           email: "",
//           avatarUrl: "",
//           role: "",
//           isLoading: false,
//         })
//       );
//     }
//   } catch (error) {
//     Modal.error({
//       centered: true,
//       title: "Error",
//       icon: <ExclamationCircleOutlined />,
//       content:
//         "Your account is disabled, you are not allowed to access this page!",
//       onOk() {},
//     });
//   }
// };
// export default loginUser;
