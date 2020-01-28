import axios from 'axios';

const correctCredentials = {
    email: 'admin@email.com',
    password: '@Password123'
}

// const baseURL = 'https://business-directory-backend.herokuapp.com/api/';
const baseURL = 'http://localhost:4000/api/';

const getRequest = (url) => axios.get(url);

const postRequest = (url, data) => axios.post(url, data);

const loginRequest = (data) => axios.post(`${baseURL}auth/login`, data);

export { loginRequest, getRequest, postRequest, correctCredentials }