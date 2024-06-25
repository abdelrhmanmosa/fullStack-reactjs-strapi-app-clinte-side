import axios from "axios";

export const axiosInstant = axios.create({
  baseURL: "http://localhost:1337",
});
