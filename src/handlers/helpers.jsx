
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

const emailValidator = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const websiteValidator = (website) => {
    const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return re.test(String(website).toLocaleLowerCase());
}

export { setToken, getToken, setUserData, getUserData, websiteValidator, emailValidator }