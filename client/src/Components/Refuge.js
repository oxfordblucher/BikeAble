import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import CoordsContext from '../Utils/coords-context';

class Refuge extends Component {
    static contextType = CoordsContext;
    constructor(){
        super();
        this.state={
            restrooms: []
        }
    }
    
    componentDidMount = () => {
        axios.get('https://www.refugerestrooms.org/api/v1/restrooms/by_location', {
            'params': {
                'page':1,
                'lat': parseFloat((this.context.coords1.lat + this.context.coords2.lat)/2),
                'lng': parseFloat((this.context.coords1.lng + this.context.coords2.lng)/2)
            }
        })
        .then(res => {
            this.setState({
                restrooms: res.data,
                coords1: this.context.coords1,
                coords2: this.context.coords2
            })
        })
    }

    setWaypoint = (lat, lng) => {
        this.context.unmountMap();
        this.context.setWaypoint(lat, lng);
        this.context.mountMap();
    }

    render() {
        const restroomList = this.state.restrooms.map((restroom, i) => {
            let directions = '';
            let comments = '';
            if(restroom.directions) {
                directions = `Directions: ${restroom.directions}`
            }else{
                directions = ''
            }
            if(restroom.comments) {
                comments = `Comments: ${restroom.comments}`
            }else{
                comments = ''
            }
            return (
                <Card key={i}>
                    <Card.Header> {restroom.name} </Card.Header>
                    <Card.Body>
                        <Card.Title> {restroom.street} {restroom.city} </Card.Title>
                        <Card.Text>
                            {directions} <br/>
                            {comments}
                        </Card.Text>
                        <Button onClick={()=>this.setWaypoint(restroom.latitude, restroom.longitude)}>Set as detour</Button>
                    </Card.Body>
                </Card>
            )
        })

        return (
            <div>
                {restroomList}
            </div>
        )
    }
}

export default Refuge;