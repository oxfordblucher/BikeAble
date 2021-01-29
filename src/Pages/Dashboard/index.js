import React from 'react';
import Location from '../../Components/Location';

function Dashboard() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md'>
                    <Location />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;