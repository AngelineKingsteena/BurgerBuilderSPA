import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "your firebase database url"
});

export default axiosInstance;
