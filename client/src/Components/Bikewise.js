import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardImg from 'react-bootstrap/CardImg';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Bikewise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zipcode: NaN,
            incidents: [],
            recent: Math.floor(Date.now() / 1000) - 31540000,
            filteredIncidents: [],
            filtered: 'year'
        }
    }

    componentDidMount = () => {
        axios.get(`/auth/user/zipcode`).then(res => {
                    
            axios.get('https://bikewise.org/api/v2/incidents', {
                'params': {
                    'occurred_after': this.state.recent,
                    'proximity': res.data,
                    'proximity_square': 20
                }
            })
                .then(resp => {
                    console.log(resp.data);
                    this.setState({
                        incidents: resp.data.incidents,
                        filteredIncidents: resp.data.incidents
                    })
                })
        })
    }


    filter = (key) => {
        let utc = 0;
        switch (key) {
            case 'week':
                utc = Math.floor(Date.now() / 1000) - 604800;
                break;
            case 'month':
                utc = Math.floor(Date.now() / 1000) - 2628000;
                break;
            default:
                utc = Math.floor(Date.now() / 1000) - 31540000;
                break;
        }
        let filteredList = this.state.incidents.filter(incident => incident.occurred_at > utc);
        this.setState({
            filteredIncidents: filteredList,
            filtered: key
        })
    }

    render() {
        const incidentList = this.state.filteredIncidents.map((incident, i) => {
            let time = new Date(incident.occurred_at * 1000);
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let formattedtime = `${months[time.getMonth()]} ${time.getDate()} ${time.getFullYear()}`

            return (
                <Card key={i} className={`${incident.type} col-xs-12 col-sm-6 col-md-4 col-lg-3`}>
                    <Card.Header> {incident.type} </Card.Header>
                    <CardImg src={incident.media.image_url_thumb || 'https://via.placeholder.com/300'} />
                    <Card.Body>
                        <Card.Title> {incident.title} </Card.Title>
                        <Card.Subtitle> At: {incident.address} On: {formattedtime}</Card.Subtitle>
                        <br />
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
                <DropdownButton id="dateFilter" title={`In the past ${this.state.filtered}`}>
                    <Dropdown.Item onClick={() => this.filter('week')}>Week</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.filter('month')}>Month</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.filter('year')}>Year</Dropdown.Item>
                </DropdownButton>
                <div className='d-flex align-content-stretch flex-wrap'>
                    {incidentList}
                </div>
            </div>
        )
    }
}

export default Bikewise;