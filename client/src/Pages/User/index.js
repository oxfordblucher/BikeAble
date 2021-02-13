import React, { useState, Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { API } from "../../Utils/userAPI";
import "./user.css";

const User = (props) => {

    const [bikeFrame, setFrame] = useState('')
    const [bikeType, setType] = useState('')
    const [tireWidth, setWidth] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        API.Equipment(bikeFrame, bikeType, tireWidth,).then(res => {
            alert(JSON.stringify(res))
        })
        
    }

    

    

        


    return (
        <div className="Equipment">
            
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" className="bikeFrame" controlId="bikeFrame">
                    <Form.Label>Bike Frame</Form.Label>
                    <Form.Control
                        
                        type="bikeFrame"
                        value={bikeFrame}
                        onChange={(e) => setFrame(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" className="bikeType" controlId="bikeType">
                    <Form.Label>Bike Type</Form.Label>
                    <Form.Control
                        type="bikeType"
                        value={bikeType}
                        onChange={(e) => setType(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group size="lg" className="tireWidth" controlId="tireWidth">
                    <Form.Label>Tire Width</Form.Label>
                    <Form.Control
                        type="tireWidth"
                        value={tireWidth}
                        onChange={(e) => setWidth(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" className="submitButton" type="submit">
                    Submit
        </Button>
                
        
            </Form>
        </div>
    );
}


export default User;





