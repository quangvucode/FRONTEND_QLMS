// src/services/api.service.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Thay cổng này theo cổng của backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
