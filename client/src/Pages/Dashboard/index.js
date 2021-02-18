import React, { Component } from 'react';
import Location from '../../Components/LocationForm';
import Bikewise from '../../Components/Bikewise';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Contextual from '../../Components/Contextual';
import CoordsContext from '../../Utils/coords-context';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Dashboard extends Component {
    setCoords = (coords1, coords2) => {
        console.log(coords1, coords2);
        this.setState({
            coords1: coords1,
            coords2: coords2,
            found: true
        })
    }

    setWaypoint = (lat, lng) => {
        this.setState({
            waypoint: {
                lat: lat,
                lng: lng
            }
        })
    }

    state = {
        coords1: {
            lat: NaN,
            lng: NaN
        },
        coords2: {
            lat: NaN,
            lng: NaN
        },
        zipCode: NaN,
        found: false,
        setCoords: this.setCoords,
        setWaypoint: this.setWaypoint,
        redirect: false
    };

    componentDidMount = () => {
        axios.get('/auth/user')
            .then(res => {
                console.log(res.data);
                if(!res.data.name) {
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