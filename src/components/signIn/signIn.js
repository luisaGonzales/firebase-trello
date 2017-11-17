import React, {Component} from 'react';
import './signIn.css';
import {NavLink} from 'react-router-dom';
import {Form, FormGroup, FormControl, Col, Button, ControlLabel, Alert} from 'react-bootstrap';
import {signIn} from '../../actions/actions'

const SignIn = ({}) => {
    return (
        <div className="background text-center">
            <Form
                horizontal
                onSubmit=
                { e => { 
                        e.preventDefault(); 
                        if(this.email.value && this.password.value.length > 5)
                        {  
                            signIn(this.email.value, this.password.value);
                            this.email.value = "";
                            this.password.value = "";
                        } 
                    }
                }>
                <img
                    src="https://phoenix-trello.herokuapp.com/images/logo-11ecccd65d1c7977997eb6f0bc0002ad.png?vsn=d"
                    alt="logo"
                    className="brand"/>
                <FormGroup controlId="formHorizontalEmail">
                    <Col smOffset={4} sm={4}>
                        <FormControl
                            className="inputSI"
                            type="email"
                            placeholder="Email"
                            inputRef={ref => {
                            this.email = ref
                        }}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">

                    <Col smOffset={4} sm={4}>
                        <FormControl
                            className="inputSI"
                            type="password"
                            placeholder="Password"
                            autoComplete="disabled"
                            inputRef={ref => {
                            this.password = ref
                        }}/>
                        <p className="instruccions">* Debe contener por lo menos 6 caracteres.</p>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={4} sm={4}>
                        <Button type="submit" className="btnSubmit">
                            Sign In
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    );
}

export default SignIn;