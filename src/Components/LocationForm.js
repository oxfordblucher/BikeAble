import React, { useState } from 'react';


const LocationForm = (props) => {

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');


    return (
        <div className='createRoute card'>
            <h2 className='card-title'>Get a route!</h2>
            <div className='card-body'>
                <form className='mapForm'>
                    <div className='form-group justify-content-start'>
                        <input
                            type='text'
                            placeholder="Starting Location"
                            required
                            value={start}
                            onChange={e => setStart(e.target.value)}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group justify-content-start'>
                        <input
                            type='text'
                            placeholder="Destination"
                            required
                            value={end}
                            onChange={e => setEnd(e.target.value)}
                            className='form-control'
                        />
                    </div>
                    <button className='btn btn-success mt-3 mb-3' type='submit'>Map My Route!</button>
                </form>
            </div>
        </div>
    )

}

export default LocationForm;