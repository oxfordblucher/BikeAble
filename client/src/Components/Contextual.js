import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import CoordsContext from '../Utils/coords-context';
import Gear from '../Components/Gear.js';
import Refuge from './Refuge.js';
import Saved from '../Components/Saved.js';

class Contextual extends Component {
    static contextType = CoordsContext;

    render() {
        let found = this.context.found;
        const renderOptions = () => {
            if(found){
                return <Refuge/>
            }else{
                return null;
            }
        }
        return (
            <Tab.Container defaultActiveKey='first'>
                <Row>
                    <Col>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link eventKey='first'>My Gear</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='second'>Restrooms</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='third'>Save(d) Routes</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey='first'>
                                <Gear />
                            </Tab.Pane>
                            <Tab.Pane eventKey='second'>
                                {renderOptions()}
                            </Tab.Pane>
                            <Tab.Pane>
                                <Saved />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }
}

export default Contextual;