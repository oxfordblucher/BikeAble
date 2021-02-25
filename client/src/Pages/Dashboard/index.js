import React, { Component } from 'react';
import Location from '../../Components/LocationForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CoordsContext from '../../Utils/coords-context';
import axios from 'axios';
import './dashboard.css';
import Navi from '../../Components/Nav';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Gear from '../../Components/Gear.js';
import Refuge from '../../Components/Refuge.js';
import Saved from '../../Components/Saved.js';
import Bikewise from '../../Components/Bikewise';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Messages from '../../Components/Messages';
import {Redirect} from 'react-router-dom';


class Dashboard extends Component {
    static contextType = CoordsContext;
    constructor() {
        super();
        this.state={
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
        if(this.state.redirect) {
            return <Redirect to='/' />
        }

        return (
            <React.Fragment>
                <Navi />
                <Tab.Container defaultActiveKey='first' transition={false} className='dashboard'>
                    <Row>
                        <Col sm={12} md={3} lg={2} className='d-none d-md-block'>
                            <Nav variant='pills' className='flex-column'>
                                <Nav.Item>
                                    <Nav.Link eventKey='first'>Routing</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='second'>Saved Routes</Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item>
                                    <Nav.Link eventKey='third'>Messages</Nav.Link>
                                </Nav.Item> */}
                                <Nav.Item>
                                    <Nav.Link eventKey='fourth'>Incidents Near Me</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='fifth'>My Gear</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={12} className='d-md-none d-sm-block'>
                            <NavDropdown id='dropdown' title='Dashboard Panel'>
                                <Nav.Item>
                                    <Nav.Link eventKey='first'>Routing</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='second'>Saved Routes</Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item>
                                    <Nav.Link eventKey='third'>Messages</Nav.Link>
                                </Nav.Item> */}
                                <Nav.Item>
                                    <Nav.Link eventKey='fourth'>Incidents Near Me</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='fifth'>My Gear</Nav.Link>
                                </Nav.Item>
                            </NavDropdown>
                        </Col>
                        <Col>
                            <Tab.Content>
                                <Tab.Pane eventKey='first' mountOnEnter='true' unmountOnExit='true'>
                                    <Location />
                                </Tab.Pane>
                                <Tab.Pane eventKey='second' mountOnEnter='true' unmountOnExit='true'>
                                    <Saved />
                                </Tab.Pane>
                                {/* <Tab.Pane eventKey='third' mountOnEnter='true' unmountOnExit='true'>
                                    <Messages />
                                </Tab.Pane> */}
                                <Tab.Pane eventKey='fourth' mountOnEnter='true' unmountOnExit='true'>
                                    <Bikewise />
                                </Tab.Pane>
                                <Tab.Pane eventKey='fifth' mountOnEnter='true' unmountOnExit='true'>
                                    <Gear />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </React.Fragment>
        )
    }
}

export default Dashboard;