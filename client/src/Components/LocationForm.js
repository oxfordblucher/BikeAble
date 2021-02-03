import React, { Component, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';

class LocationForm extends Component {
    constructor(props) {
        super(props);

        const address = this.getEmptyAddress();
        this.state = {
            'address': address,
            'query': '',
            'locationId': ''
        }

        this.onQuery = this.onQuery.bind(this);
    }

    onQuery(e) {
        const query = e.target.value;
        if (!query.length > 0) {
            const address = this.getEmptyAddress();
            return this.setState({
                'address': address,
                'query': '',
                'locationId': ''
            })
        }

        const self = this;
        axios.get('https://autosuggest.search.hereapi.com/v1/autosuggest',
            'params': {
                'apiKey': `${process.env.REACT_APP_hereApiKey}`,
                'q': query,
                'resultType': `houseNumber`
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(`Navigating from ${start} to ${end}`);
    }

    render() {
        return (
            <Card className='getRoute mt-1'>
                <Card.Title className='mx-auto'>Get a route!</Card.Title>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='justify-content-start'>
                            <Form.Control
                                type='text'
                                placeholder="Starting Location"
                                required
                                value={start}
                                onChange={e => setStart(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='justify-content-start'>
                            <Form.Control
                                type='text'
                                placeholder="Destination"
                                required
                                value={end}
                                onChange={e => setEnd(e.target.value)}
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