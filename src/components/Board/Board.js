import React from 'react'
import {addStage, signOut} from '../../actions/actions'
import Stage from '../Stage/Stage';
import './Board.css';
import {Button, Form, FormGroup, FormControl, Col} from 'react-bootstrap';
import {connect} from 'redux-zero/react';
import {Redirect} from 'react-router-dom';
import Header from '../Header/Header';

const Board = ({boards, successLogin, boardSelect, user }) => {
  let  list = null;
  if (boards[boardSelect].stages) 
    list = boards[boardSelect].stages.map((stage, index) => {
    return <Stage
      key={index}
      board={stage} 
      index={index} 
      boardSelect={boardSelect} 
      successLogin={successLogin}
      />
  });
  return (
    <div className="Board-container">
      {
        !successLogin && <Redirect to='/signIn'/>
      }
      <Header name={user.firstname}/>
      <h3>{boards[boardSelect].name}</h3>
      <div className="Board-column">
        {list}
      </div>
      <div className="Board-column">
      <Form 
        horizontal
        onSubmit = {(e) => {
          e.preventDefault();
          addStage(boardSelect, this.stageInputRef.value);
          this.stageInputRef.value = "";
        }}>
        <FormGroup>
          <FormControl 
            className= "inputSI"
            type = "text"
            inputRef = {e => this.stageInputRef = e} className="inputBoard"
          />
          <FormGroup>
            <Col smOffset={4} sm={4}>
              <Button type="submit" className="btnSubmit">
                Add Stage
              </Button>
            </Col>
          </FormGroup>
      </FormGroup>
      </Form>
    </div>
    </div>
  );
}

const mapToProps = ({boards, successLogin, boardSelect, user }) => ({boards, successLogin, boardSelect, user });
export default connect(mapToProps)(Board);
