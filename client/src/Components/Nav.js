import React from 'react';
import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
            
            <Link className='navbar-brand' to="/">BikeAble</Link>
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to="/dashboard">Dashboard</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/discover">Discover</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/register">Register</Link>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/User'>Profile</a>
                </li>

            </ul>
        </nav>
    )
}

export default Nav;