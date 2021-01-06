import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:5001/',
  headers: { 'content-type': 'application/json' }

});


export default api;
