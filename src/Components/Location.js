import React, { useState } from 'react';

const Location = () => {

    const startLoc = useRef();
    const destLoc = useRef();
    
    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: LOADING });
        ExtensionScriptApis.savePost({
            
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
                            ref={startLoc}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder="Destination"
                            required 
                            ref={destLoc}
                        />
                    </div>
                    <button className='btn btn-success mt-3 mb-5' type='submit'>Map My Route!</button>
                </form>
            </div>
        </card>
    )
}

export default Location;