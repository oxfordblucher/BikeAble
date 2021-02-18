import axios from 'axios';

export const API = {
    getAllUsers: () => {
        return axios.get('/api/users')
    },
    registerUser: (firstName, user_name, password, zipCode) => {
        return axios.post('/auth/register', { firstName: firstName, username: user_name, password: password, zipCode: zipCode })
    },
    loginUser: (username, password) => {
        return axios.post("/auth/login", { username: username, password: password })
    },
    Equipment: (bikeFrame, bikeType, tireWidth) => {
        return axios.post("/auth/bike", { bikeFrame: bikeFrame, bikeType: bikeType, tireWidth: tireWidth })
    },
    getZipUsers: (zipCode) => {
        return axios.post('/api/users', { zipCode: zipCode })
    }

};
