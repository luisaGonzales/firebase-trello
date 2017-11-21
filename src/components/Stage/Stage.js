import React from 'react'
import Task from '../Task/Task'
import {addTask} from '../../actions/actions'

const Stage = ({board, index, boardSelected, successLogin}) => {
      let list = null;
      if(board.tasks){
            list = board.tasks.map ( (task, index) => {
                  return <Task  key = {index} title = {task}/>
            });
      }
      return (
            <div>
                  <h3> {board.name}</h3>
                  {list}
                  <form onSubmit = { (e) => {
                        e.preventDefault();
                        console.log ('this.taskInputRef.value', this.taskInputReference.value)
                        addTask (boardSelected, index, this.taskInputReference.value );
                        this.taskInputReference.value = "";
                  }}>
                  <input type="text" ref = {e => this.taskInputReference = e}/>
                  <button type="submit">
                        save card
                  </button>
                  </form>
            </div>
            
      );
}
export default Stage;