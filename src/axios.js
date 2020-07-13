import axios from "axios";

const instance = axios.create({
  baseURL: "https://conduit.productionready.io/api/",
  headers: [
    {
      "Access-Control-Allow-Origin": "*",
    },
  ],
});

export default instance;
