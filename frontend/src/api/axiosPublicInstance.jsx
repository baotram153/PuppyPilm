import axios from 'axios'

// axios instance for public requests
const axiosPublicInstance = axios.create({
    baseURL: 'https://puppypilm.tatrungtin.id.vn/api/',
});

export default axiosPublicInstance