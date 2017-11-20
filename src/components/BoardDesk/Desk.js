import React, {Component} from 'react';
import {signOut, addBoard} from '../../actions/actions';
import './Desk.css';
import {Button, Form, FormGroup, FormControl, Col} from 'react-bootstrap';
import {connect} from 'redux-zero/react';
import {Redirect} from 'react-router-dom';
import Header from '../Header/Header';

const TitleBoard = ({title}) =>  (
    <div>
       <div>  {title} </div>
    </div>
) ;

const Desk = ({successLogin, boards, user}) => {
    const deskList = boards.map ( (board, index) => {
        return 
            <li key={index}>
                <TitleBoard title={board.name}  />
            </li>
        
     });

    return (
        <div className="desk">
            {
                !successLogin && <Redirect to = '/signIn' />
            }
            <Header name={user.firstname}/>
            <Button type="button" 
                className="btnSubmit" 
                onClick={
                    () => {signOut()}}>
                Sign Out
            </Button>
            <div>
            <ul>
                {deskList}
            </ul>
            </div>
            <Form
                horizontal
                onSubmit=
                { e => { 
                        e.preventDefault(); 
                        if(this.board)
                        {  
                            addBoard(this.board.value);
                            this.board.value = "";
                        } 
                    }
                }>
                <FormGroup controlId="formHorizontalEmail">
                    <Col smOffset={4} sm={4}>
                        <FormControl
                            className="inputSI"
                            type="text"
                            placeholder="Agrega un Board Aquí"
                            inputRef={ref => {
                            this.board = ref
                        }}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={4} sm={4}>
                        <Button type="submit" className="btnSubmit">
                            Add Board
                        </Button>
                    </Col>
                </FormGroup>
            </Form> 
        </div>
    );
}

const mapToProps = ({successLogin, boards, user}) => ({successLogin, boards, user})
export default connect(mapToProps)(Desk);
