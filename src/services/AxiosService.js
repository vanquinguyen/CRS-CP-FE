import axios from "axios";
import { getToken } from "./localStorage";

const BASE_API_ENDPOINT = "localhost:3001"; // Just example

class AxiosService {
  async axios({
    method,
    url,
    data,
    params,
    responseType,
    headers = {},
    baseURL = BASE_API_ENDPOINT,
  }) {
    // remove interceptor if exists
    if (!!this.axiosInterceptorRequest || this.axiosInterceptorRequest === 0) {
      axios.interceptors.request.eject(this.axiosInterceptorRequest);
    }

    return new Promise((resolve, reject) => {
      const options = {
        method,
        baseURL,
        url,
        headers,
        params,
        data,
        responseType,
        timeout: 30000,
      };

      // Request interceptor for API calls
      this.axiosInterceptorRequest = axios.interceptors.request.use(
        async (config) => {
          const token = getToken();
          const customConfig = { ...config };
          if (token) {
            customConfig.headers.Authorization = token;
          }

          return customConfig;
        },
        (error) => {
          Promise.reject(error);
        }
      );

      axios
        .request(options)
        .then((res) => {
          if (!res) return;
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export { AxiosService };
