import axios from "axios";

const instance = axios.create({
  // baseURL: "http://oaboss.qidian.com",
  baseURL: "http://127.0.0.1:3000",
});

export default instance;
