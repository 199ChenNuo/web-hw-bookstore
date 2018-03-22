import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import Button from 'antd/lib/button';
import Index from './components/INDEX';
import {BrowserRouter} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
      return (
          <div className="App">
            <BrowserRouter>
            <Index />
            </BrowserRouter>
            <h1>seperator</h1>
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
                  <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                  To get started, edit <code>src/App.js</code> and save to reload.
              </p>
          </div>
      )
  }
}

export default App;

