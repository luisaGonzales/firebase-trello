import React, {Component} from 'react';
import {signOut, addBoard} from '../../actions/actions';
import './Desk.css';
import {Button, Form, FormGroup, FormControl, Col} from 'react-bootstrap';
import {connect} from 'redux-zero/react';
import {Redirect} from 'react-router-dom';


const TitleBoard = ({title}) =>  (
    <div className = 'Task-container'>
       <div className='Task-title'>  {title} </div>
    </div>
) ;

const Desk = ({successLogin, boards}) => {
    const deskList = boards.map ( board => {
        return <TitleBoard title={board} />
     });

    return (
        <div>
            {
                !successLogin && <Redirect to = '/signIn' />
            }
            <Button type="button" 
                className="btnSubmit" 
                onClick={
                    () => {signOut()}}>
                Sign Out
            </Button>
            <div>
                {deskList}
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

const mapToProps = ({successLogin}) => ({successLogin})
export default connect(mapToProps)(Desk)
