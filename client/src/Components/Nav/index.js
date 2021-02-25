import React, { useContext, useState } from 'react';
import "./Nav.css";
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { API } from '../../Utils/userAPI';
import CoordsContext from '../../Utils/coords-context';

function Navi() {
    const [redirect, setRedir] = useState(false)
    const context = useContext(CoordsContext);

    const logOut = () => {
        API.logoutUser().then(res => {
            if(res.data.success) {
                context.logOut();
                setRedir(true)
            }
        })
    }

    if (redirect) {
        return <Redirect to='/' />
    }

    return (
        <Navbar className='navbar' expand='lg'>
            <Navbar.Brand href="/dashboard"><Image className='logo' src={process.env.PUBLIC_URL + '/opener127.png'} /></Navbar.Brand>
            <Navbar.Toggle aria-controls='navbar-nav' />
            <Navbar.Collapse id='navbar-nav'>
                <Nav className='ml-auto'>
                    <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
                    <Nav.Link href='/discover'>Discover</Nav.Link>
                    <Nav.Link href='/user'>Profile</Nav.Link>
                    <Button variant='outline-danger' onClick={logOut}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

}

export default Navi;