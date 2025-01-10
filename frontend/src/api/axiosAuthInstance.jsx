import axios from 'axios'

// axios instance for authenticated requests
const axiosAuthInstance = axios.create({
    baseURL: 'https://puppypilm.tatrungtin.id.vn/api/',
})

// add authentication token to the header of every request
axiosAuthInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default axiosAuthInstance