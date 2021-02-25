import React, { useState, Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { API } from "../../Utils/userAPI";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./user.css";
import Navi from '../../Components/Nav';
import CoordsContext from "../../Utils/coords-context";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

class Profile extends Component {

    static contextType = CoordsContext;
    constructor() {
        super();
        this.state = {
            user: {},
            redirect: false
        }
    }

    componentDidMount = () => {
        axios.get('/auth/user')
            .then(res => {
                if (!res.data.name) {
                    this.setState({
                        redirect: true
                    })
                }
            })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        return (
            <React.Fragment>
                <Navi />
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <h1>About Me</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3>My Gear</h3>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <h3>My Favorite Routes</h3>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}


export default Profile;





