import React, {Component} from 'react';
import './signUp.css';
import {NavLink,Redirect} from 'react-router-dom';
import {Form, FormGroup, FormControl, Col, Button, ControlLabel} from 'react-bootstrap';
import {signUp, signOut} from '../../actions/actions'
import {connect} from 'redux-zero/react';

const SignUp = ({successLogin}) => {
    const onSubmit = (e) => {
        e.preventDefault();
        let correctPassword = false;
        if(this.firstName.value && this.lastName.value && this.email.value && this.password.value && this.confirmPassword.value){
            if(this.confirmPassword.value === this.password.value){
                signUp(this.firstName.value, this.lastName.value, this.email.value, this.password.value); 
                this.firstName.value = "";
                this.lastName.value = "";
                this.email.value = ""; 
                this.password.value = "";
                this.confirmPassword.value = "";
            } else {
                alert("Las contraseñas no son iguales");
                this.password.value = "";
                this.confirmPassword.value = "";
                this.password.focus();
            }
        } 
    }
    return (
        <div className="background text-center">
        {
            successLogin && <Redirect to = "/boards"/>
        }
            <Form horizontal onSubmit={onSubmit}>
                <img src="https://phoenix-trello.herokuapp.com/images/logo-11ecccd65d1c7977997eb6f0bc0002ad.png?vsn=d" alt="logo" className="brandSU"/>
                <FormGroup controlId="formHorizontalEmail">
                    <Col smOffset={4} sm={4}>
                        <FormControl className="inputSI" type="text" placeholder="First name" autoComplete="none" inputRef={ref => { this.firstName = ref }}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col smOffset={4} sm={4}>
                        <FormControl className="inputSI" type="text" placeholder="Last name" autoComplete="none" inputRef={ref => { this.lastName = ref }}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col smOffset={4} sm={4}>
                        <FormControl className="inputSI" type="email" placeholder="E-mail" autoComplete="none" inputRef={ref => { this.email = ref }}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col smOffset={4} sm={4}>
                        <FormControl className="inputSI" type="password" placeholder="Password" autoComplete="none" inputRef={ref => { this.password = ref }}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col smOffset={4} sm={4}>
                        <FormControl className="inputSI" type="password" placeholder="Confirm Password" autoComplete="none" inputRef={ref => { this.confirmPassword = ref }}/>
                    </Col>
                </FormGroup>
                <p className="instruccions">*La contraseña debe contener por lo menos 6 caracteres.</p>
                <FormGroup>
                    <Col smOffset={4} sm={4}>
                        <Button type="submit" className="btnSubmit">
                            Sign Up
                        </Button>
                    </Col>
                </FormGroup>
                <NavLink className="navlinkSI" to="/signIn">Sign In</NavLink>
            </Form>
        </div>
    );
}

const mapToProps = ({successLogin})  => ({successLogin}) 
export default connect(mapToProps)(SignUp) ;