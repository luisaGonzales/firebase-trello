import React, { Component } from 'react';
import {connect} from 'redux-zero/react'
import './App.css';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import Board from './components/Board/Board';
import SignIn from './components/signIn/signIn';
import SignUp from './components/signUp/signUp';
import Desk from './components/BoardDesk/Desk';

const App = ({boards, successLogin, boardSelect, user})=> {
  return(
    <HashRouter>
      <Switch>
          <Route exact path="/" render={() => <SignIn successLogin={successLogin}/>} />
          <Route exact path="/signIn" render={() => <SignIn successLogin={successLogin}/>} />
          <Route exact path="/signUp" render={() => <SignUp />} />
          <Route exact path="/desk" render={() => <Desk boards={boards} />} />
          <Route exact path="/boards" render={() => <Board boards={boards} />} />
          <Route render={() => <Redirect to={"/"} />}/>
      </Switch>
    </HashRouter>
  );
}


const mapToProps = ({boards, successLogin, boardSelect, user})  => ({boards, successLogin, boardSelect, user})
export default connect(mapToProps)(App);