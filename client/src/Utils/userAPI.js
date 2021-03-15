import axios from 'axios';

export const API = {
    /* getAllUsers: () => {
        return axios.get('/api/users')
    }, */
    registerUser: (firstName, user, email, password, zipCode) => {
        return axios.post('/auth/register', { firstName: firstName, email: email, user: user, password: password, zipCode: zipCode })
    },
    loginUser: (email, password) => {
        return axios.post("/auth/login", { email: email, password: password })
    },
    addGear: (model, frame, type, gear) => {
        return axios.post("/auth/user/bike", { modelName: model, frame: frame, type: type, gearset: gear })
    },
    getZipUsers: (zipCode) => {
        return axios.post('/api/users/users', { zipCode: zipCode })
    },
    getUserMsgs: () => {
        return axios.get('/auth/messages')
    },
    getGear: () => {
        return axios.get('/auth/gear')
    },
    logoutUser: () => {
        return axios.get('/auth/logout')
    },
    getUserData: (userId) => {
        return axios.post('/api/users/profiles', { userId: userId})
    },
    sendMessage: (sender, recipient) => {
        return axios.post('auth/user/message', {sender: sender, recipient: recipient})
    }
};
