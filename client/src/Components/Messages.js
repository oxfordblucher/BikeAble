import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { API } from '../Utils/userAPI';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class Messages extends Component {
    constructor() {
        super();
        this.state={
            messages: [],
            filtered: []
        }
    }
    
    componentDidMount = () => {
        API.getUserMsgs().then(res => {
            this.setState({
                messages: res.data,
                filtered: res.data
            })
        })
    }

    render() {
        if (this.state.messages.length === 0) {
            return (
                <Container>
                    <Row>
                        <h2>Your inbox is currently empty, check back later!</h2>
                    </Row>
                </Container>
            )
        }else{
            let messages = this.state.filtered.map((message, i) => {
                return (
                    <li key={message._id}>
                        From: {message.from} Subject: {message.subject} Date: {message.createdAt}
                        <span><Button onClick={()=>this.expand(message._id)}>Read</Button></span>
                    </li>
                )
            })

            return (
                <div>
                    <ul>
                        {messages}
                    </ul>
                </div>
            )
        }
    }
}

export default Messages;