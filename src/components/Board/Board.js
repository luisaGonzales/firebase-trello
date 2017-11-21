import React from 'react'
import {addStage, signOut} from '../../actions/actions'
import Stage from '../Stage/Stage';
import './Board.css';
import {Button, Form, FormGroup, FormControl, Col} from 'react-bootstrap';
import {connect} from 'redux-zero/react';
import {Redirect} from 'react-router-dom';
import Header from '../Header/Header';

const Board = ({stages, tasks, successLogin, user}) => {
  const list = stages.map(stage => {
    return <Stage
      key={stage}
      title={stage}
      tasks=
      { tasks.filter ( e => e.stage === stage )}/>
  });
  return (
    <div className="Board-container">
      {
        !successLogin && <Redirect to='/signIn'/>
      }
      <Header name={user.firstname}/>
      <div className="Board-column">
        {list}
      </div>
      <div className="Board-column">
      <Form 
        horizontal
        onSubmit = {(e) => {
          e.preventDefault();
          addStage(this.stageInputRef.value);
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
                Sign In
              </Button>
            </Col>
          </FormGroup>
      </FormGroup>
      </Form>
    </div>
    </div>
  );
}





const mapToProps = ({stages, tasks, successLogin, user}) => ({stages, tasks, successLogin, user});
export default connect(mapToProps)(Board);
