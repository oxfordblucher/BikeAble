import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { API } from "../../Utils/userAPI";
import "./Login.css";
import { useHistory, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

const Register = (props) => {
    let history = useHistory();
    const [firstName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [zipCode, setZipCode] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        API.registerUser(firstName, email, password, zipCode).then(res => {
            // This is whre I redirect
            if (res.data.success) {
                history.push('/')
            }
        })
    }

    // const redirectToReferrer = this.state.redirectToReferrer;
    // if (redirectToReferrer === true) {
    //     return <Redirect to="/dashboard" />
    // }


    return (
        <div className="Login">
            <h1>Register for BikeAble!</h1>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" className="email" controlId="firstName" >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            autoFocus
                            type="firstName"
                            value={firstName}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" className="email" controlId="email" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" className="password" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" className="password" controlId="zipCode">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                            type="zipCode"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="lg" className="sign" type="submit">
                        Sign Up!
        </Button>
                    <p>
                        Already a member?{" "}
                        <Link to="/">
                            <span
                                className="glyphicon glyphicon-plus-sign"
                                aria-hidden="true"
                            ></span>{" "}
            Login Here
          </Link></p>
                </Form>
            </Container>
        </div>
    );
}


export default Register;