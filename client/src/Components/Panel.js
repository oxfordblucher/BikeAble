import React, {Component} from 'react';
import CoordsContext from '../Utils/coords-context';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Panel extends Component {

    static contextType = CoordsContext;

    componentDidMount = () => {
        this.context.setSummary(this.props.summary.distance, this.props.summary.duration, this.props.directions)
    }

    saveRoute = () => {
        let wp;
        if (this.context.waypoint) {
            wp = {
                lat: this.context.waypoint.lat,
                lon: this.context.waypoint.lng
            }
        }else{
            wp = {};
        }
        axios({
            method: 'post',
            url: '/auth/user/route',
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
              waypoint: wp,
              summary: {
                distance: this.props.summary.distance,
                duration: this.props.summary.duration
              },
              directions: this.props.directions
            }
          }).then(data => {
            if(data.success) {
                alert('Route Saved!')
            }
          })
    }

    render() {
        const directions = this.props.directions.map((direction, i) => {
            let length = parseInt(direction.length * 3.28084),
                readLength;
            if (length === 0) {
                readLength = ''
            }else if (length > 5280) {
                readLength = `Continue for ${parseFloat(length/5280).toFixed(2)} miles.`
            }else{
                readLength = `Continue for ${length} feet.`
            }
            let instruction = `${direction.instruction.split('Go')[0]} ${readLength}`;
            return (
                <li key={i}>
                    {instruction}
                </li>
            )
        })

        return (
            <div>
                <h4 className='text-center'>{this.props.label} <span><Button onClick={()=>this.saveRoute()}>Save Route</Button></span></h4>
                <ol>
                    {directions}
                </ol>
                <p>
                    Total Distance: {this.props.summary.distance} miles
                    <br/>
                    Travel Time: {this.props.summary.duration}
                </p>
            </div>
        )
    }
}

export default Panel;