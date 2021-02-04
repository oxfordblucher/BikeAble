import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import PropTypes from 'prop-types';

class LocationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'start': "",
            'end': "",
            'coords1': {},
            'coords2': {},
            'suggestions': []
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })

        if (!value.length > 0) {
            let address = ""
            return this.setState({
                [name]: address
            })
        }

        axios.get(`https://autocomplete.search.hereapi.com/v1/autocomplete`, {
            'params': {
                'apiKey': process.env.REACT_APP_hereApiKey,
                'q': `${value}`,
                'limit': 3
            },
            'headers': {
                'crossorigin':true
            }
        }).then(res => {
            const address = res.data.items[0].address;
            const coords = res.data.items[0].position;

            switch (name) {
                case 'start':
                    this.setState({
                        'start': address,
                        'coords1': coords
                    });
                    break;

                case 'end':
                    this.setState({
                        'end': address,
                        'coords2': coords
                    });
                    break;

                default:
                    console.log('Failed to get coordinates.');
                    break;
            }

            console.log(`${this.state.coords1} to ${this.state.coords2}`)
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(`Navigating from ${this.state.start} to ${this.state.end}`);

        axios.get('https://router.hereapi.com/v8/routes?transportMode=bike', {
            'params': {
                'origin': `${this.state.coords1.lat},${this.state.coords1.lng}`,
                'destination': `${this.state.coords2.lat},${this.state.coords2.lng}`,
                'return': 'polyline',
                'apiKey': process.env.REACT_APP_hereApiKey
            }
        })
    }

    render() {
        return (
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
        )
    }
}

export default LocationForm;