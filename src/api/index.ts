import axios from "axios";

export const getToken = () => {
  const storageToken = localStorage.getItem("token");

  if (storageToken) {
    const token = JSON.parse(storageToken);

    return token;
  }
};

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});
