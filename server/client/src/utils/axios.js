import axios from "axios";

const originFetch = axios.create({
  baseUrl: "thisUrl",
});

export default originFetch;
