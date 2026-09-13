import axios from 'axios';

const API_URL = import.meta.env.PROD
  ? 'https://alpha-interior.onrender.com/api'
  : '/api';

const API = axios.create({ baseURL: API_URL });

export default API;
