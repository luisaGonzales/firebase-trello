import React, {Component} from 'react';
import './signIn.css';
import {NavLink} from 'react-router-dom';
import {Form, FormGroup, FormControl, Col, Button, ControlLabel} from 'react-bootstrap';
// import {signIn} from './Actions'

const SignIn = ({}) => {
    const onSubmit = (e) => {
        e.preventDefault();
        // if(this.email.value && this.password.value){
        //     signIn(this.email.value, this.password.value);
        //     this.email.value = "";
        //     this.password.value = "";
        // }
    }
    return (
        <div className="background text-center">
            <Form horizontal onSubmit={onSubmit}>
                <img src="https://phoenix-trello.herokuapp.com/images/logo-11ecccd65d1c7977997eb6f0bc0002ad.png?vsn=d" alt="logo" className="brand"/>
                <FormGroup controlId="formHorizontalEmail">
                    <Col smOffset={4} sm={4}>
                        <FormControl className="inputSI" type="email" placeholder="Email" inputRef={ref => { this.email = ref }}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col smOffset={4} sm={4}>
                        <FormControl className="inputSI" type="password" placeholder="Password" inputRef={ref => { this.password = ref }}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={4} sm={4}>
                        <Button type="submit" className="btnSubmit">
                            <NavLink to="boards">Sign in</NavLink>
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    );
}

export default SignIn;