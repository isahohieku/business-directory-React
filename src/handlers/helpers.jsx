
const setToken = (data) => {
    localStorage.setItem('token', data);
}

const setUserData = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
}

const getToken = () => {
    return localStorage.getItem('token');
}

const getUserData = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export { setToken, getToken, setUserData, getUserData }