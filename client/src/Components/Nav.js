import React from 'react';
import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
            {/* <a className='navbar-brand' href='/'>
                BikeAble
            </a> */}
            <Link className='navbar-brand' to="/">BikeAble</Link>
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    {/* <a className='nav-link' href='/dashboard'>Dashboard</a> */}
                    <Link className='nav-link' to="/dashboard">Dashboard</Link>
                </li>
                <li className='nav-item'>
                    {/* <a className='nav-link' href='/discover'>Discover</a> */}
                    <Link className='nav-link' to="/discover">Discover</Link>
                </li>
                <li className='nav-item'>
                    {/* <a className='nav-link' href='/register'>Register</a> */}
                    <Link className='nav-link' to="/register">Register</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;