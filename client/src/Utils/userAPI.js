import axios from 'axios';

const userAPI = () => {
    const getAllUsers = () => {
        return axios.get('/api/users')
    }
};

export default userAPI;