import axios from "axios";

const API = axios.create({
  baseURL: "https://talentsync-ai-backend.onrender.com/api",
});

export default API;