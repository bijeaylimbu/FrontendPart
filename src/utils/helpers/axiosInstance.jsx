import axios from "axios";
const basePath="https://localhost:5001/api";
const axiosInstance=axios.create({
    baseURL: basePath
});

export default axiosInstance;