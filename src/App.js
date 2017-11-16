import React, { Component } from 'react';
import {connect} from 'redux-zero/react'
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Board from './components/Board/Board';
// import SignIn from './components/signIn/signIn';
// import SignUp from './components/signUp/signUp';


const App = ({stages, tasks}) => {
  return(
    <BrowserRouter>
      <Switch>
          {/* <Route exact path="/" render={() => <SignIn />} /> */}
          {/* <Route exact path="/signIn" render={() => <SignIn />} />
          <Route exact path="/signUp" render={() => <SignUp />} /> */}
          <Route exact path="/boards" render={() => <Board stages={stages} tasks={tasks}/>} />
          {/* <Route render={() => <Redirect to={"/"} />}/> */}
      </Switch>
      
    </BrowserRouter>

  );
}


const mapToProps = ({stages, tasks})  => ({stages, tasks}) 
export default connect(mapToProps)(App);