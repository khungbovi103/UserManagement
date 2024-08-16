// src/services/userService.js
import axios from "axios";

const API_URL = "http://localhost:8088/api/v1/user";

export const getAllUsers = () => {
  return axios.get(`${API_URL}/get-all`);
};

export const getUserById = (id) => {
  return axios.get(`${API_URL}/user/${id}`);
};

export const createUser = (user) => {
  return axios.post(`${API_URL}/save`, user);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
};

export const updateUser = (id) => {
  return axios.put(`${API_URL}/edit/${id}`);
};

export const exportUserByIds = (ids) => {
  return axios.post(`${API_URL}/export`, ids, {
    responseType: "blob", // important for handling binary data
  });
};
