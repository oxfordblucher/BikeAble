import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import './Discover.css';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import { API } from "../../Utils/userAPI";
import { UsersList, UserListItem } from "./nearList";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Navi from '../../Components/Nav';

function Users() {

    const [zipCode, setZipCodeSearch] = useState("");
    const [users, setUsers] = useState([])
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        API.getZipUsers(zipCode).then(res => {
            setUsers(res.data)
            setZipCodeSearch("")

        }).catch(error => console.log(error))
    }

    useEffect(() => {
        axios.get('/auth/user')
            .then(res => {
                if (!res.data.name) {
                    setRedirect(true)
                }
            })
    });

    if (redirect) {
        return <Redirect to='/' />
    }

    return (
        <React.Fragment>
            <Navi />
            <Table>
                <h1>Users in Your Area!</h1>
                <Container>
                    <Form>
                        <Form.Control onChange={(e) => setZipCodeSearch(e.target.value)} type="text" className="zipCode" placeholder="Enter your Zip Code" />
                        <Button
                            onClick={handleSubmit}
                            block size="lg" className="zipButton">
                            Find Cyclers
                        </Button>
                    </Form>
                    <div>
                        <ul>

                        </ul>
                    </div>
                    {users.length ? users.map((user, index) => 
                        <li className='nearListItem' key={user._id}>{`First Name: ${user.firstName},`} {` username: ${user.username},`}{` ZipCode: ${user.zipCode},`} <a href={`/user/${user._id}`}>Profile</a></li>) 
                        : "No users found"}

                </Container>

            </Table>
        </React.Fragment>
    );
}


export default Users;
