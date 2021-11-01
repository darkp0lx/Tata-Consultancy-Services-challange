const axios = require('axios');

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 5000,
  headers: {"Content-Type":"application/json"}
});