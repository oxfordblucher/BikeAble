import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import './Discover.css';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import { API } from "../../Utils/userAPI";
import { UsersList, UserListItem } from "./nearList"

function Users() {

    const [zipCode, setZipCodeSearch] = useState([]);
    const [users, setUsers] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        API.getZipUsers(zipCode).then(res => {
            console.log(res.data)
            setUsers(res.data)
            setZipCodeSearch("")

        }).catch(error => console.log(error))
    }

    return (
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
                {users.length ? users.map((user, index) => <div><ul>
                    <li>{`First Name: ${user.firstName},`} {` username: ${user.username},`}{` ZipCode: ${user.zipCode},`} </li></ul></div>) : "No users found"}
            </Container>

        </Table>
    );
}


export default Users;
