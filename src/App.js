import React, { Component } from 'react';
import {connect} from 'redux-zero/react'
import './App.css';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import Board from './components/Board/Board';
import SignIn from './components/signIn/signIn';
// import SignUp from './components/signUp/signUp';


const App = ({stages, tasks}) => {
  return(
    <HashRouter>
      <Switch>
          <Route exact path="/" render={() => <SignIn />} />
          <Route exact path="/signIn" render={() => <SignIn />} />
          <Route exact path="/signUp" render={() => <SignUp />} />
          <Route exact path="/boards" render={() => <Board stages={stages} tasks={tasks}/>} />
          <Route render={() => <Redirect to={"/"} />}/>
      </Switch>
    </HashRouter>
  );
}


const mapToProps = ({stages, tasks})  => ({stages, tasks}) 
export default connect(mapToProps)(App);