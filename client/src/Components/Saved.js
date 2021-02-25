import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import CoordsContext from '../Utils/coords-context';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Map from './Map';

class Saved extends Component {
    static contextType = CoordsContext;
    constructor() {
        super();
        this.state = {
            routes: [],
            show: false,
            chosen: {}
        }
    }

    componentDidMount = () => {
        axios.get('/auth/user/routes')
            .then(res => {
                this.setState({
                    routes: res.data
                })
            })
    }

    delete = (id) => {
        axios.delete(`/auth/routes/${id}`)
            .then(res => {
                let routeList = this.state.routes.filter(routes => routes._id !== id);
                this.setState({
                    routes: routeList
                })
            })
    }

    favorite = (id) => {
        axios.post(`/auth/routes/fav/${id}`)
            .then(res => {
            })
        this.btn.setAttribute('disabled', 'disabled');
    }

    mapRoute = (routeObj) => {
        this.setState({
            show: true,
            chosen: routeObj
        })
        console.log(routeObj);
    }

    render() {

        if (this.state.routes.length === 0) {
            return (
                <Container>
                    <Row>
                        <h2>No routes saved at the moment. Feel free to add one or many.</h2>
                    </Row>
                </Container>
            )
        } else {
            const renderMap = () => {
                if (this.state.show) {
                    return <Map 
                        lat1={this.state.chosen.start.lat}
                        lat2={this.state.chosen.end.lat}
                        lng1={this.state.chosen.start.lon}
                        lng2={this.state.chosen.end.lon}
                        wayLat={this.state.chosen.waypoint.lat}
                        wayLng={this.state.chosen.waypoint.lon}
                    />
                }else{
                    return null
                }
            }

            const routeList = this.state.routes.map((route, i) => {
                let favBtn;
                if (route.favorited) {
                    favBtn = null;
                } else {
                    favBtn = <Button ref={btn => { this.btn = btn; }} onClick={() => this.favorite(route._id)}>Favorite</Button>
                }
                return (
                    <Card key={route._id} className='col-sm-6 col-lg-4'>
                        <Card.Header> {route.start.name} - {route.end.name} </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {route.summary.distance} miles
                                        <br />
                                {route.summary.duration}
                            </Card.Text>
                            <Button onClick={() => this.delete(route._id)}>Delete</Button>
                            {favBtn}
                            <Button onClick={() => this.mapRoute(route)}>Show Map</Button>
                        </Card.Body>
                    </Card>
                )
            })

            return (
                <Container>
                    {renderMap()}
                    <Row>
                        <Col className='d-flex align-content-stretch flex-wrap'>
                            {routeList}
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default Saved;