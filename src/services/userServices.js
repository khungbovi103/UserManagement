// src/services/userService.js
import axios from "axios";

const API_URL = "http://localhost:8080/users";

export const getAllUsers = () => {
  return axios.get(API_URL);
};

export const createUser = (user) => {
  return axios.post(API_URL, user);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
