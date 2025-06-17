import axios from "axios";

const api = axios.create({
    baseURL: "https://pontolog.hopto.org:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

export default api
