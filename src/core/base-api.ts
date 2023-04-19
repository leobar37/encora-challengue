import Axios from "axios";

export const baseApi = Axios.create({
  baseURL: "http://localhost:3000",
});
