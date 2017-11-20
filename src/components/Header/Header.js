import React from 'react'
import {signOut} from '../../actions/actions'
import './Header.css';
import {Button, Row, Col } from 'react-bootstrap';
import {Redirect, NavLink} from 'react-router-dom';


const Header = ({name}) => {
    return(
        <Row className="header">
        <Col xs={1} xsOffset={0} md={1} mdOffset={0}>
        </Col>
        <Col xs={2} xsOffset={4} md={2} mdOffset={4}>
            <img width={150} 
            src="https://phoenix-trello.herokuapp.com/images/logo-11ecccd65d1c7977997eb6f0bc0002ad.png?vsn=d" 
            className="" 
            alt="logo" />
        </Col>
        <Col xs={1} xsOffset={3} md={1} mdOffset={3}>
            <div className="btn headerElement">{name}</div>
        </Col>
        <Col xs={1} xsOffset={0} md={1} mdOffset={0}>

            <Button onClick={
                () => {signOut()}}
                className="btn headerElement">
                <i className="fa fa-sign-out" aria-hidden="true"></i> Sign out
            </Button>
        </Col>
        </Row>
    );
}


export default Header;