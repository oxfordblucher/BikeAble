import React from 'react';

function Nav() {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
            <a className='navbar-brand' href='/'>
                BikeAble
            </a>
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <a className='nav-link' href='/dashboard'>Dashboard</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/discover'>Discover</a>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;