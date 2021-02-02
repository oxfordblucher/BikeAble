import React from 'react';
import userAPI from '../../Utils/userAPI';

const Discover = () => {
    userAPI({public: true})
    .then(results => {
        console.log(results);
    })
};

export default Discover;