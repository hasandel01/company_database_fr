import axios from "axios";

const axiosInstance = axios.create( {
    baseURL: 'http://localhost:5285/api',
    headers: {

    }
})

export default axiosInstance;