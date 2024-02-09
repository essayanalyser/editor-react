import axios from "axios";

const app_api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

app_api.headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "true",
};

export default app_api;
