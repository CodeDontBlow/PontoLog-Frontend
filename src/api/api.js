import axios from "axios";

const api = axios.create({
    baseURL: "http://pontolog.hopto.org:3000/",
    // baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

export default api