import React from 'react';
import Location from '../../Components/LocationForm';
import Map from '../../Components/Map';

function Dashboard() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md'>
                    <Location />
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;