import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import CoordsContext from '../Utils/coords-context';

class Saved extends Component {
    static contextType = CoordsContext;
    constructor() {
        super();
        this.state = {
            routes: []
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

    saveRoute = (event) => {
        event.preventDefault();

        const routeList = this.state.routes.map((route, i) => {
            return (
                <Card key={route._id}>
                    <Card.Header> {route.start.name} - {route.end.name} </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {route.summary.distance} miles
                                    <br />
                            {route.summary.duration}
                        </Card.Text>
                        <Button onClick={()=> this.delete(route._id)}>Delete</Button>
                    </Card.Body>
                </Card>
            )
        })

    

        return(
            <div> {routeList} </div >
        )
    }
}

export default Saved;