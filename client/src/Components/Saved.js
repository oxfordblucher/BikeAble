import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import Card from 'react-bootstrap/esm/Card';
import CoordsContext from '../Utils/coords-context';

class Saved extends Component {
    static contextType = CoordsContext;
    constructor() {
        super();
        this.state={
            routes: []
        }
    }

    componentDidMount = () => {
        axios.get('/auth/user/routes')
    }

    render() {

        const routeList = this.state.routes.map((route, i) => {
            return (
                <Card key={i}>
                    <Card.Header> {route.start.name} - {route.end.name} </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {route.summary.distance} miles
                            <br/>
                            {route.summary.duration}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })

        return (
            <div>

            </div>
        )
    }
}

export default Saved;