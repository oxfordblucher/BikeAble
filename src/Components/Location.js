import React, { useContext, useState } from 'react';
import hereAPI from '../Utils/hereAPI';

const Location = () => {

    const startRef = useRef();
    const destRef = useRef();
    
    const handleSubmit = e => {
        e.preventDefault();
        hereAPI.getRoute({
            lat1: '',
            long1: '',
            lat2: '',
            long2: 1
        })
        .then(result => {
            console.log(result);
        })
    }

    return (
        <card className='createRoute'>
            <h2 className='card-title'>Get a route!</h2>
            <div className='card-body'>
                <form className='mapForm' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder="Starting Location"
                            required 
                            ref={startRef}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder="Destination"
                            required 
                            ref={destRef}
                        />
                    </div>
                    <button className='btn btn-success mt-3 mb-5' type='submit'>Map My Route!</button>
                </form>
            </div>
        </card>
    )
}

export default Location;