import React, {Component} from 'react';

class Panel extends Component {
    render() {
        const directions = this.props.directions.map((direction, i) => {
            let length = parseInt(direction.length * 3.28084),
                readLength;
            if (length > 5280) {
                readLength = `${parseFloat(length/5280).toFixed(2)} miles`
            }else{
                readLength = `${length} feet`
            }
            let instruction = `${direction.instruction.split('Go')[0]} Continue for ${readLength}.`;
            return (
                <li key={i}>
                    {instruction}
                </li>
            )
        })

        return (
            <div>
                <h4 className='text-center'>{this.props.label}</h4>
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