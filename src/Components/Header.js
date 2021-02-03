import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <Navbar bg='light' expand='lg'>
            <Navbar.Brand href='/'>
                BikeAble
            </Navbar.Brand>
            <Nav className='ml-auto'>
                <Nav.Item>
                    <Nav.Link href='/dashboard'>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/discover'>Discover</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}

export default Header;