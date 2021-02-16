import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import CoordsContext from '../Utils/coords-context';
/* import Gear from '../Components/Gear.js';
import RouteOptions from '../Components/RouteOptions.js'; */

class Contextual extends Component {
    static contextType = CoordsContext;

    render() {
        return (
            <Tab.Container defaultActiveKey='first'>
                <Row>
                    <Col>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link eventKey='first'>My Gear</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='second'>Map Options</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey='first'>
                                {/* <Gear /> */}
                                <div>
                                    <p>
                                        Model: <br/>
                                        Frame: <br/>
                                        Crankset: <br/>
                                        Derailleur: <br/>
                                    </p>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey='second'>
                                {/* <RouteOptions /> */}
                                <div>
                                    {/* <Refuge /> */}
                                    <p>
                                        Refuge Restrooms API
                                        {this.context.coords1.lat}
                                    </p>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }
}

export default Contextual;