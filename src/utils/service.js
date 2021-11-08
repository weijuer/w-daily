import axios from "axios";

// create an axios instance
const service = axios.create({
  baseURL: "/",
  withCredentials: true,
  timeout: 5000
});

export default service;
