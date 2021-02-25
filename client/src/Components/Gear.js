import React, { useEffect, useState } from 'react';
import { API } from '../Utils/userAPI';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Gear = () => {
    const [gear, setGear] = useState([])

    const [gearset, setGearset] = useState('')
    const [type, setType] = useState('')
    const [model, setModel] = useState('')
    const [frame, setFrame] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        API.addGear(model, frame, type, gearset).then(res => {
            gear.push(res.data);
        })
    }

    useEffect(() => {
        API.getGear().then(res => {
            setGear(res.data);
        })
    }, []);

    if (gear.length === 0) {
        return (
            <React.Fragment>
                <h2>Save your gear!</h2>
                <Form onSubmit={handleSubmit} className='col-xs-12 col-md-10 col-lg-8'>
                    <Form.Group>
                        <Form.Label>Bike Model (if applicable)</Form.Label>
                        <Form.Control
                            type='model' 
                            placeholder='Make or Model' 
                            value={model}
                            onChange={(e)=>setModel(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Frame</Form.Label>
                        <Form.Control 
                            as='select' 
                            type='frame' 
                            placeholder='Type of frame' 
                            value={frame}
                            onChange={(e)=>setFrame(e.target.value)}
                        >
                            <option>Steel</option>
                            <option>Chromoly</option>
                            <option>Carbon</option>
                            <option>Aluminum</option>
                            <option>Titanium</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Type</Form.Label>
                        <Form.Control 
                            as='select' 
                            type='type' 
                            placeholder='Type of bike' 
                            value={type}
                            onChange={(e)=>setType(e.target.value)}
                        >
                            <option>Cyclocross</option>
                            <option>BMX</option>
                            <option>Road</option>
                            <option>Hybrid</option>
                            <option>Mountain</option>
                            <option>Gravel</option>
                            <option>Cruiser</option>
                            <option>Touring</option>
                            <option>Recumbent</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Gearset</Form.Label>
                        <Form.Control 
                            type='gearset' 
                            placeholder='Gearset' 
                            value={gearset}
                            onChange={(e)=>setGearset(e.target.value)} 
                        />
                    </Form.Group>
                    <Button type='submit' block size='med'>Add bike</Button>
                </Form>
            </React.Fragment>
        )
    } else {
        const bikeList = gear.map((gear, i) => {
            return (
                <Card key={gear._id} className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
                    <Card.Header>{gear.modelName}</Card.Header>
                    <Card.Img />
                    <Card.Body>
                        <Card.Title>{gear.frame} {gear.type} bike</Card.Title>
                        <Card.Text>
                            Gearset: {gear.gearset}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })
        return (
            <div>
                {bikeList}
            </div>
        )
    }
}

export default Gear;