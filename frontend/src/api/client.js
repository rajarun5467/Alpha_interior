import axios from 'axios';

const API_URL = import.meta.env.PROD
  ? 'https://alpha-interior.onrender.com/api'
  : '/api';

const API = axios.create({ baseURL: API_URL });

// Upgrade insecure http:// backend URLs to https:// (fixes Mixed Content for
// image URLs stored before the x-forwarded-proto fix)
export function resolveImageUrl(url) {
  if (!url) return url;
  return url.replace('http://alpha-interior.onrender.com', 'https://alpha-interior.onrender.com');
}

export default API;
