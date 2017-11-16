import React, { Component } from 'react';
import {connect} from 'redux-zero/react'
import './App.css';
import Board from './components/Board/Board'

const App = ({stages, tasks}) => {
  return(
    <div>
      <Board stages={stages} tasks={tasks}/>
    </div>

  );
}

const mapToProps = ({stages, tasks})  => ({stages, tasks}) 
export default connect(mapToProps)(App);