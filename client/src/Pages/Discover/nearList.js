import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export function UsersList({ children }) {
    return <ul className="list-group">{children}</ul>;
};
// component to render each user/zipcode
export function UserListItem(props) {
    return (
        <li className="list-group-item" key={props.id}>
            <Container>
                <Row>
                    <Col size="xs-8 sm-10">
                        <h3>{props.firstName}</h3>
                        <p>
                            {props.zipCode}
                        </p>
                    </Col>
                </Row>
            </Container>
        </li>
    );
};