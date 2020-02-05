import axios from 'axios';

const correctCredentials = {
    email: 'admin@email.com',
    password: '@Password123'
}

// const baseURL = 'https://business-directory-backend.herokuapp.com/api/';
const baseURL = 'http://localhost:4000/api/';

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    } 
}

const getRequest = (url) => axios.get(url, config);

const postRequest = (url, data) => axios.post(url, data, config);

const updateRequest = (url, data) => axios.put(url, data, config);

const loginRequest = (data) => axios.post(`${baseURL}auth/login`, data);

export { loginRequest, getRequest, postRequest, updateRequest, correctCredentials }