import React, { useState } from 'react';

function Location(props) {

    const [routeStart, setStart] = useState({})
    const [formObj, setFormObj] = useState({
        start: '',
        destination: ''
    })

    


    return (
        <form className='mapping'>
            <input
                type='text'
                placeholder='Search'
                value={searchTerm}
            />
        </form>
    )
}