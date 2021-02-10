
import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import PropTypes from 'prop-types';
import Map from './Map';

class LocationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'start': "",
            'end': "",
            'coords1': {},
            'coords2': {},
            'suggestions': [],
            'found': false
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })

        if (value.length > 5) {
            axios.get(`/here/autocomplete/${value}`)
            .then(res => {
                console.log(res);
                const coords = res.data.items[0].position;

                switch (name) {
                    case 'start':
                        this.setState({
                            'start': res.data.items[0].title,
                            'coords1': coords
                        });
                        break;

                    case 'end':
                        this.setState({
                            'end': res.data.items[0].title,
                            'coords2': coords
                        });
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
        console.log(`Navigating from ${this.state.start} to ${this.state.end}`);

        this.setState({ 'found': true })

        axios.get(`/here/route/${this.state.coords1.lat}/${this.state.coords1.lng}/${this.state.coords2.lat}/${this.state.coords2.lng}`)
            .then(res => {
                console.log(res.data);
            })
    }

    render() {
        const success = this.state.found;

        const renderMap = () => {
            if (success) {
                return <Map
                    lat1={this.state.coords1.lat}
                    lon1={this.state.coords1.lng}
                    lat2={this.state.coords2.lat}
                    lon2={this.state.coords2.lng}
                />
            } else {
                return null;
            }
        }

        return (
            <div>
                <Card className='getRoute mt-1'>
                    <Card.Title className='mx-auto'>Get a route!</Card.Title>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Group className='justify-content-start'>
                                <Form.Control
                                    type='text'
                                    placeholder="Starting Location"
                                    required
                                    name="start"
                                    value={this.state.start}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className='justify-content-start'>
                                <Form.Control
                                    type='text'
                                    placeholder="Destination"
                                    required
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
            </div >
        )
    }
}

export default LocationForm;