import axios from "axios";

const API = axios.create({
  baseURL: "https://assign5-meetpulse-v1.onrender.com"
});


// Attach JWT token to every request
API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  }

);


// ================= AUTH HELPERS =================

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const registerUser = (data) =>
  API.post("/auth/register", data);


export default API;