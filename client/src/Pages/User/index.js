import React, { useEffect, useState } from 'react';
import { API } from '../../Utils/userAPI';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './user.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const User = ({ match, location }) => {
    const [profile, setProfile] = useState({
        routes: '',
        bike: ''
    })

    console.log(match.params.userId);

    useEffect(() => {
        API.getUserData(match.params.userId).then(res => {
            setProfile(res.data);
        })
    }, [])

    const message = (id) => {
        API.sendMessage(id).then(res => {
            if (res.data.success) {
                alert('Success!')
            }
        })
    }

    return (
        <div className='profilePage'>
            <h1>Welcome to <span className='profileName'>{profile.username}</span>'s profile</h1>
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h3>About Me</h3> <br />
                                <p>
                                    name: {profile.firstName} <br />
                                    zipcode: {profile.zipCode}
                                </p>
                            {/* <Button onClick={()=message(profile._id)}>Drop me a line!</Button> */}                            
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>My Gear</h3>
                                <div>
                                    {profile.bike.length > 0 ? profile.bike.map((bike, i) => 
                                    <Card key={bike}>
                                        <Card.Header></Card.Header>
                                        <Card.Body>
                                            <Card.Text>

                                            </Card.Text>
                                        </Card.Body>
                                    </Card>)
                                    : <p>No bikes saved yet</p>}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <h3>My Favorite Routes</h3>
                        <div>
                            <ul>
                                {profile.routes.length > 0 ? profile.routes.map((route, i) =>
                                    <li key={route}>{route}</li>)
                                    : <p>No routes favorited yet</p>}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default User;