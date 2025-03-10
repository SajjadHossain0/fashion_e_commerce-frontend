import axios from "axios";

// Create an Axios instance with the base URL
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
