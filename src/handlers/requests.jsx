import axios from 'axios';
import { getToken } from './helpers';

const correctCredentials = {
    email: 'admin@email.com',
    password: '@Password123'
}

// const baseURL = 'https://business-directory-backend.herokuapp.com/api/';
const baseURL = 'http://localhost:4000/api/';



const setHeader = () => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        } 
    }

    return config;
}

const getRequest = (url) => axios.get(url, setHeader());

const postRequest = (url, data) => axios.post(url, data, setHeader());

const updateRequest = (url, data) => axios.put(url, data, setHeader());

const deleteRequest = (url) => axios.delete(url, setHeader());

const loginRequest = (data) => axios.post(`${baseURL}auth/login`, data);

export { loginRequest, getRequest, postRequest, updateRequest, deleteRequest, correctCredentials }