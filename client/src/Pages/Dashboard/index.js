import React from 'react';
import Location from '../../Components/LocationForm';
import Bikewise from '../../Components/Bikewise';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Contextual from '../../Components/Contextual';



function Dashboard() {
    return (
        <Container fluid>
            <Row>
                <Col xs lg='3'>
                    <Bikewise />
                </Col>
                <Col xs lg='6'>
                    <Location />
                </Col>
                <Col xs lg='3'>
                    <Contextual />
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;