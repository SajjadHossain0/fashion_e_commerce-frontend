import axios from "axios";

// Create an Axios instance with the base URL
const apiClient = axios.create({
    //baseURL: "http://localhost:8080/api",
    baseURL: "https://fashion-e-commerce-backend.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
