import axios from 'axios';
const baseURL = "http://localhost:5000/api"


const instance = axios.create({
    baseURL,
});

export default instance;
