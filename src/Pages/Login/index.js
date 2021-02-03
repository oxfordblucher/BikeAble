import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dashboard from "../Dashboard"
import "./Login.css";

const passport = require("passport");
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portalId: "",
            password: "",
            redirectToReferrer: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        fakeAuth.authenticate(() => {
            this.setState({
                portalId: this.refs.portalId.value,
                password: this.refs.password.value,
                redirectToReferrer: true
            })
        })
        e.preventDefault();
    }


    render() {
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            <Redirect to="/dashboard" />
        }

        return (
            <div className="Login">
                <h1>Welcome to Bikeable!</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" className="email" controlId="email">
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
                    <Button block size="lg" className="loginButton" type="submit" disabled={!validateForm()}>
                        Login
        </Button>
                    <Button block size="lg" className="sign" type="submit" disabled={!validateForm()}>
                        Sign Up!
        </Button>
                </Form>
            </div>
        );
    }
}

export default Login;