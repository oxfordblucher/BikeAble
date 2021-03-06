import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Map from './Map';
import { DebounceInput } from 'react-debounce-input';
import CoordsContext from '../Utils/coords-context';
import Col from 'react-bootstrap/Col';
import Refuge from './Refuge';
import Row from 'react-bootstrap/Row';

class LocationForm extends Component {
    constructor() {
        super();
        this.state = {
            'start': "",
            'end': "",
            'coords1': {},
            'coords2': {}
        }
    }
    static contextType = CoordsContext;

    handleInputChange = event => {
        const { name, value } = event.target;

        if (value.length > 5) {
            axios.get(`/here/autocomplete/${value}`)
                .then(res => {
                    console.log(res);
                    const lat = res.data.items[0].position.lat;
                    const lng = res.data.items[0].position.lng;

                    switch (name) {
                        case 'start':
                            this.setState({
                                'start': res.data.items[0].title,
                                'coords1': {
                                    'lat': lat,
                                    'lng': lng
                                }
                            });
                            this.context.unmountMap();
                            break;

                        case 'end':
                            this.setState({
                                'end': res.data.items[0].title,
                                'coords2': {
                                    'lat': lat,
                                    'lng': lng
                                }
                            });
                            this.context.unmountMap();
                            break;

                        default:
                            console.log('Failed to get coordinates.');
                            break;
                    }
                })
        }
    }


    handleSubmit = event => {
        event.preventDefault();

        this.context.setCoords(this.state.coords1, this.state.coords2, this.state.start, this.state.end);
    }

    componentDidUpdate = () => {

    }

    render() {
        const success = this.context.found;

        const renderMap = () => {
            if (success) {
                return <Map 
                    lat1={this.context.coords1.lat}
                    lat2={this.context.coords2.lat}
                    lng1={this.context.coords1.lng}
                    lng2={this.context.coords2.lng}
                    wayLat={this.context.waypoint.lat}
                    wayLng={this.context.waypoint.lng}
                />
            } else {
                return null;
            }
        }

        const renderRefuge = () => {
            if (success) {
                return <Refuge />
            } else {
                return (
                    <div>
                        <h3>Map a route for options.</h3>
                    </div>
                )
            }
        }

        return (
            <React.Fragment>
                <Row>
                    <Col xs={12} md={8}>
                        <Card className='getRoute mt-1'>
                            <Card.Title className='mx-auto'>Get a route!</Card.Title>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <Form.Group className='justify-content-start'>
                                        <DebounceInput
                                            className='input-group'
                                            placeholder="Start"
                                            minLength={5}
                                            debounceTimeout={700}
                                            value={this.state.start}
                                            name='start'
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className='justify-content-start'>
                                        <DebounceInput
                                            className='input-group'
                                            placeholder="Destination"
                                            minLength={5}
                                            debounceTimeout={700}
                                            name="end"
                                            value={this.state.end}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Button block size='med' className='mb-3' type='submit'>Map My Route!</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        {renderMap()}
                    </Col>
                    <Col xs={12} md={4}>
                        {renderRefuge()}
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default LocationForm;