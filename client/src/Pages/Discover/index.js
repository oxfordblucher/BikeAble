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

    const handleSubmit = (e) => {
        e.preventDefault();
        API.getZipUsers(setZipCodeSearch).then(res => {
            console.log(res)

        }).catch(error => console.log(error))
    }


    return (
        <Table>
            <h1>Users in Your Area!</h1>
            <Container>
                <Form>
                    <Form.Control type="zipCode" className="zipCode" placeholder="Enter your Zip Code" />
                    <Button
                        onClick={handleSubmit}
                        block size="lg" className="zipButton">
                        Find Cyclers
            </Button>
                </Form>
                {/* <UsersList>
                    {this.state.Users.map(users => {
                        return (
                            <UserListItem
                                name={users.firstName}
                                zipCode={users.zipCode}
                            />);
                    })}
                </UsersList> */}
            </Container>

        </Table>
    );
}


export default Users;
