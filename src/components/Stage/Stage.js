import React from 'react'
import Task from '../Task/Task'
import {addTask} from '../../actions/actions'

const Stage = ({board, index, boardSelected, successLogin}) => {
      const list = board.tasks.map ( (task, index) => {
            return <Task  key = {index} title = {task}/>
      });
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
export default Stage

// class Stage  extends React.Component{
//    render () {
      
//       return  (
//          <div>
//                <h3> {this.props.title}</h3>
//                {list}
//             <form onSubmit = { (e) => {
//                e.preventDefault();
//                console.log ('this.taskInputRef.value', this.taskInputReference.value)
//                addTask (this.props.title, this.taskInputReference.value);
//                this.taskInputReference.value = "";
//             }}>
//                <input type="text" ref = {e => this.taskInputReference = e}/>
//                <button type="submit">
//                   save card
//                </button>
//             </form>

//          </div>
//       )
//    }
// }
// export default Stage