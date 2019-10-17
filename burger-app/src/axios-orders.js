import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://burger-app-a222c.firebaseio.com/"
});

export default axiosInstance;
