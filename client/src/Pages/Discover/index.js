import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

class Discover extends Component {
    state = {
        userList: []
    };

    componentDidMount() {
        axios.get('/api/users')
            .then(data => {
                console.log(data);
            })
    }

    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Users</th>
                    </tr>
                </thead>
            </Table>
        )
    }
};

export default Discover;