import axios from 'axios';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'http://localhost:3101',
})

export default api;