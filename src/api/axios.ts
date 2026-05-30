import axios from "axios";

const API = axios.create({
  baseURL: "https://edtech-be-ydzc.onrender.com/api"
});

export default API;