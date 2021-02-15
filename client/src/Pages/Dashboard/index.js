import React from 'react';
import Location from '../../Components/LocationForm';
import Bikewise from '../../Components/Bikewise';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Context from '../../Components/Context';


function Dashboard() {
    return (
        <Container fluid>
            <Row>
                <Col xs lg='2'>
                    <Bikewise />
                </Col>
                <Col xs lg='8'>
                    <Location />
                </Col>
                <Col xs lg='2'>
                    <Context />
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;