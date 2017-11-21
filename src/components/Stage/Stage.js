import React from 'react'
import Task from '../Task/Task'
import './Stage.css';
import {addTask} from '../../actions/actions';
import {connect} from 'redux-zero/react';

const Stage = ({board, index, boardSelected, successLogin}) => {
      let list = null;
      console.log(board.tasks);
      if(board.tasks){ 
            list = board.tasks.map ( (task, index) => {
                  return <Task  key = {index} title = {task}/>
            });
      }
      return (
            <div className="margin">
                  <h3> {board.name}</h3>
                  <div className="listaStage">
                        {list}
                  </div>
                  <form onSubmit = { (e) => {
                        e.preventDefault();
                        console.log ('this.taskInputRef.value', this.taskInputReference.value)
                        addTask (boardSelected, index, this.taskInputReference.value );
                        this.taskInputReference.value = "";
                  }}>
                  <input type="text" className="inputSaveCard" ref = {e => this.taskInputReference = e}/>
                  <button type="submit" className="butonSaveCard">
                        Save Card
                  </button>
                  </form>
            </div>
            
      );
}

const mapToProps = ({successLogin}) => ({successLogin})
export default connect(mapToProps)(Stage);