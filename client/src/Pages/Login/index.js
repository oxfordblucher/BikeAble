import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import { API } from "../../Utils/userAPI";
import "./Login.css";
import { useHistory, Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';


const Login = (props) => {
    let history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        API.loginUser(email, password).then(res => {

            // This is whre I redirect
            if (res.data.success) {
                history.push('/dashboard')
            }

        }).catch(error => setShow(true))
    }


    return (
        <div className="Login">
            <div className="cycle">
                <img src={process.env.PUBLIC_URL + '/opener127.jpg'} alt='handlebars' className="cycle" />
            </div>
            <h1>Welcome to BikeAble!</h1>
            <h3>Activate your wanderlust!</h3>
            {show &&
                <Alert variant="info" onClose={() => setShow(false)} dismissible>
                    <p>
                        Incorrect Credentials, please try logging in again.
                </p>
                </Alert>}
            <Container>
                <Form onSubmit={handleSubmit} className="form">
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
                    <Button block size="lg" className="loginButton" type="submit">
                        Login
                    </Button>
                    <p>
                        Not a member?{" "}
                        <Link to="/register" className="signUp">
                            <span
                                className="glyphicon glyphicon-plus-sign"
                                aria-hidden="true"
                            ></span>{" "}
                            Register here
                        </Link>
                    </p>
                </Form>
            </Container>

        </div>
    );
}


export default Login;