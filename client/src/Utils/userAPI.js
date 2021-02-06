import axios from 'axios';

export const API = {
    getAllUsers: () => {
        return axios.get('/api/users')
    },
    registerUser: (user_name, password) => {
        return axios.post('/auth/register', { username: user_name, password: password })
    },
    loginUser: (username, password) => {
        return axios.post("/auth/login", { username: username, password: password })
    },
    Equipment: (bikeFrame, bikeType) => (axios.post("/api/bike"), { bikeFrame: bikeFrame, bikeType: bikeType })
};
