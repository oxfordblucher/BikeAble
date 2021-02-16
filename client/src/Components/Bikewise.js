import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardImg from 'react-bootstrap/CardImg';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class Bikewise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zipcode: '19123',
            incidents: [],
            recent: Math.floor(Date.now() / 1000) - 3888000

        }
    }

    componentDidMount = () => {
        axios.get('https://bikewise.org/api/v2/incidents', {
            'params': {
                'occurred_after': this.state.recent,
                'proximity': this.state.zipcode,
                'proximity_square': 20
            }
        })
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    incidents: resp.data.incidents
                })
            })
    }

    render() {

        const incidentList = this.state.incidents.map((incident, i) => {
            let time = new Date(incident.occurred_at * 1000);
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let formattedtime = `${months[time.getMonth()]} ${time.getDate()} ${time.getFullYear()}`
            return (
                <Card key={i}>
                    <Card.Header> {incident.type} </Card.Header>
                    <CardImg src={incident.media.image_url_thumb} />
                    <Card.Body>
                        <Card.Title> {incident.title} </Card.Title>
                        <Card.Subtitle> At: {incident.address} On: {formattedtime}</Card.Subtitle>
                        <Card.Text>
                            {incident.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })

        return (
            <div className='mt-1'>
                <h4>Incidents in your area</h4>
                <ButtonGroup>
                    <DropdownButton id="dateFilter" title="Date" size='sm'>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton id="radiusFilter" title="Radius" size='sm'>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                {incidentList}
            </div>
        )
    }
}

export default Bikewise;