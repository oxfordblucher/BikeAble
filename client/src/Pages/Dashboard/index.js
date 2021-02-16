import React, { Component } from 'react';
import Location from '../../Components/LocationForm';
import Bikewise from '../../Components/Bikewise';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Contextual from '../../Components/Contextual';
import CoordsContext from '../../Utils/coords-context';


class Dashboard extends Component {
    setCoords = (coords1, coords2) => {
        console.log(coords1, coords2);
        this.setState({
            coords1: coords1,
            coords2: coords2,
            found: true
        })
    }

    state = {
        coords1: {
            lat: 0,
            lng: 0
        },
        coords2: {
            lat: 0,
            lng: 0
        },
        found: false,
        setCoords: this.setCoords
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <CoordsContext.Provider value={this.state}>
                        <Col xs lg='3'>
                            <Bikewise />
                        </Col>
                        <Col xs lg='6'>
                            <Location />
                        </Col>
                        <Col xs lg='3'>
                            <Contextual />
                        </Col>
                    </CoordsContext.Provider>
                </Row>
            </Container>
        )
    }
}

export default Dashboard;