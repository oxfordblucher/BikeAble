import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { API } from "../../Utils/userAPI";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Register = (props) => {
    let history = useHistory();
    const [firstName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [user, setUser] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        API.registerUser(firstName, user, email, password, zipCode).then(res => {
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
        <div style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/open-trail.jpg'})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'auto 100%'}} className="Register">
            <h1>Join BikeAble Today!</h1>
            <Container>
                <Row>
                    <Col xs='12' lg='4'>
                        <p>
                            BikeAble allows cyclists of all skill levels to connect and share their rides in a more relaxed environment. <br/>
                            Rather than shaving seconds off your trail time, we seek the roads less traveled. <br/>
                            Activate your wanderlust!
                        </p>
                    </Col>
                    <Col xs='12' lg='4' />
                    <Col xs='12' lg='4'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group size="lg" className="formEntry" controlId="firstName" >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="firstName"
                                    value={firstName}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" className="formEntry" controlId="email" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" className="formEntry" controlId="user" >
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="user"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" className="formEntry" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" className="formEntry" controlId="zipCode">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control
                                    type="zipCode"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                            </Form.Group>
                            <Button block size="lg" className="signUp" type="submit">
                                Sign Up!
                             </Button>
                            <h5>
                                Already a member?{" "}
                                <Link to="/">
                                    Login Here
                                </Link>
                            </h5>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default Register;