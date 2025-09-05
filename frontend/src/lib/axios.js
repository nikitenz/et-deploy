import axios from "axios"

// in production there's no localhost so this has to be dynamic

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "api";

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;