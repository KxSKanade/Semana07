// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

export const register = (username, email, password) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password,
  });
};

export const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password,
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem('user');
};
