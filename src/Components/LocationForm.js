import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';

const LocationForm = (props) => {

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');


    return (
        <Card className='getRoute'>
            <Card.Title>Get a route!</Card.Title>
            <Card.Text>
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
                    <Button block size='lg' type='submit'>Map My Route!</Button>
                </Form>
            </Card.Text>
        </Card>
    )

}

export default LocationForm;