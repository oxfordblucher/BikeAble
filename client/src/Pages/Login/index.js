import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import { API } from "../../Utils/userAPI";
import "./Login.css";
import { useHistory, Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import CoordsContext from '../../Utils/coords-context';


const Login = (props) => {
    let history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const context = useContext(CoordsContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        API.loginUser(email, password).then(res => {

            // This is whre I redirect
            if (res.data.success) {
                context.logIn(res.data.user)
                history.push('/dashboard')
            }

        }).catch(error => setShow(true))
    }

    return (
        <div className="Login" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/trailbike.jpg'})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
            <div className="cycle-container container">
                <img src={process.env.PUBLIC_URL + '/opener127.png'} alt='logo' className="cycle" />
            </div>

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