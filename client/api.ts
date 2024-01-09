import axios from 'axios';
const baseURL = "https://localhost:5000/api"
export default axios.create({
    baseURL,
});