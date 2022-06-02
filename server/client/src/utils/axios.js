import axios from "axios";

const originFetch = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default originFetch;
