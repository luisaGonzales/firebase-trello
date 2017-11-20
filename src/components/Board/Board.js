import React from 'react'
import {addStage, signOut} from '../../actions/actions'
import Stage from '../Stage/Stage';
import './Board.css';
import {Button} from 'react-bootstrap';
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
      <Header name={"ol"}/>
      <div className="Board-column">
        {list}
      </div>
      <div className="Board-column">
        <form
          onSubmit=
          { (e) => { e.preventDefault(); addStage (this.stageInputRef.value); }}>
          <input type="text" ref= {e => this.stageInputRef = e}/>
          <button type="submit">
            save list
          </button>
        </form>
      </div>
      <Button
        type="button"
        className="btnSubmit"
        onClick={() => {
        console.log("click");
        signOut()
      }}>
        Sign Out
      </Button>
    </div>
  );
}

const mapToProps = ({stages, tasks, successLogin, user}) => ({stages, tasks, successLogin, user});
export default connect(mapToProps)(Board);
