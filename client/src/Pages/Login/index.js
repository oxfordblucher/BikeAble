import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { API } from "../../Utils/userAPI";
import "./Login.css";
import { useHistory, Link } from "react-router-dom";

const Login = (props) => {
    let history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        API.loginUser(email, password).then(res => {
            console.log(res.data.success)
            // This is whre I redirect
            // if (res.data.success) {
            //     history.push('/dashboard')
            // }
            // else {
            //     alert("Incorrect Credentials")
            // }
        })
    }

    // const redirectToReferrer = this.state.redirectToReferrer;
    // if (redirectToReferrer === true) {
    //     return <Redirect to="/dashboard" />
    // }


    return (
        <div className="Login">
            <h1>Welcome to Bikeable!</h1>
            <h3>Discover your route!</h3>
            <Form onSubmit={handleSubmit}>
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
                    <Link to="/register">
                        <span
                            className="glyphicon glyphicon-plus-sign"
                            aria-hidden="true"
                        ></span>{" "}
            Register here
          </Link>
                </p>
            </Form>
        </div>
    );
}


export default Login;