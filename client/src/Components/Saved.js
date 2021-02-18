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
            .then(res => {
                this.setState({
                    routes: res.data
                })
            })
    }

    saveRoute = (event) => {
        event.preventDefault();

        let wp;
        if (this.context.waypoint) {
            wp = {
                lat: this.context.waypoint.lat,
                lng: this.context.waypoint.lng
            }
        }else{
            wp = {};
        }
        axios({
            method: 'post',
            url: `/auth/user/route`,
            headers: {}, 
            data: {
              start: {
                  lat: this.context.coords1.lat,
                  lon: this.context.coords1.lng,
                  name: this.context.start,
              },
              end: {
                  lat: this.context.coords2.lat,
                  lon: this.context.coords2.lng,
                  name: this.context.end,
              },
              waypoint: wp
            }
          }).then(data => {
            if(data.success) {
                alert('Route Saved!')
            }
          })
    }

    render() {
        
        const renderRoutes = () => {
            if(this.state.routes.length === 0) {
                return null;
            }else {
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
            }
        }

        return (
            <div>
                <button onClick={()=>this.saveRoute()}>Save Route</button>
                <p>Previously Saved Routes</p>
                {renderRoutes()}
            </div>
        )
    }
}

export default Saved;