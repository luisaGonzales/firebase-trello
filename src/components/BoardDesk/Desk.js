import React, {Component} from 'react';
import {signOut, addBoard, viewBoard} from '../../actions/actions';
import './Desk.css';
import {Button, Form, FormGroup, FormControl, Col} from 'react-bootstrap';
import {connect} from 'redux-zero/react';
import {Redirect, NavLink} from 'react-router-dom';
import Header from '../Header/Header';

const TitleBoard = ({board, index}) =>  {
    return (
        <div key={index} className="">
            <NavLink className="nostyle" onClick={() => {viewBoard(index)} } to="/boards/">
                <div className="board">
                    <p>{board.name}</p>
                </div>
            </NavLink>
        </div>
    );
}

const Desk = ({successLogin, boards, user}) => {
    const deskList = boards.map ((board, index) => {
        return (
            <TitleBoard key={index} board={board} index={index}/>
        );   
    });
    console.log(deskList);
    return (
        <div className="desk">
            {
                !successLogin && <Redirect to = '/signIn' />
            }
            <Header name={user.firstname}/>
            <div className="allBoards">
                {deskList}
            </div>
            <Form
                horizontal
                onSubmit =
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
                    <Col sm={4}>
                        <FormControl
                            className="inputSI"
                            type="text"
                            placeholder="Add Board ..."
                            inputRef={ref => {
                            this.board = ref
                        }}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={4}>
                        <Button type="submit" className="btnSubmitDesk">
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
