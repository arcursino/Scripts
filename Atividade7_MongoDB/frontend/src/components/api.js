import axios from 'axios';

//https://github.com/axios/axios#request-config
const instance = axios.create({
  baseURL: 'http://localhost:3101',
  method: 'post',
  timeout: 3000, // 3 segundos
  withCredentials: true // para aceitar o cookie de CORS
});

export default instance;