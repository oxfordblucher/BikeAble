import axios from 'axios';

const userAPI = () => {
    const getAllUsers = () => {
        return axios.get('/api')
    }
};

export default userAPI;